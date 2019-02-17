package dataLake;


import java.util.List;
import org.influxdb.InfluxDB;
import org.influxdb.InfluxDBFactory;
import org.influxdb.InfluxDBMapperException;
import org.influxdb.dto.Point;
import org.influxdb.dto.Query;
import org.influxdb.dto.QueryResult;
import org.influxdb.dto.BoundParameterQuery.QueryBuilder;
import org.influxdb.impl.InfluxDBResultMapper;
import org.influxdb.annotation.Measurement;
import org.influxdb.BatchOptions;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonSyntaxException;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import org.json.*;

public class APIServiceImpl implements APIService{
	
	private static final Logger LOGGER = LogManager.getLogger(DataLakeAPI.class);
	
	public void createDB(String MessageBodyRequest, String url) throws Exception {
		InfluxDB influxDB = InfluxDBFactory.connect(url, "root", "root");	
		influxDB.enableBatch(BatchOptions.DEFAULTS);		
		
		Gson gson = new Gson();		
		BodyRequest parsedMessageBodyRequest;
		
		try {
			parsedMessageBodyRequest = gson.fromJson(MessageBodyRequest, BodyRequest.class);
			
			if (!CheckCreateOrDeleteDBRequest(parsedMessageBodyRequest)) {
				LOGGER.error("Invalid request");
				throw new RuntimeException("Invalid request");
			}
		}catch(JsonSyntaxException jsonException) {
			LOGGER.error(jsonException.getMessage());
			throw new Exception("Invalid request. " + jsonException.getMessage());	
		} 
		
		try {		
			influxDB.query(new Query("CREATE DATABASE "+ parsedMessageBodyRequest.getDb(), ""));
		} catch(Exception e) {
			LOGGER.error("Error creating database. " + e.getMessage());
			throw new Exception("Error creating database");	
		} finally {
			influxDB.close();
		}
		influxDB.close();
	}
	
	public void deleteDB(String messageBodyRequest, String url) throws Exception{
		InfluxDB influxDB = InfluxDBFactory.connect(url, "root", "root");	
		influxDB.enableBatch(BatchOptions.DEFAULTS);
		
		Gson gson = new Gson();
		BodyRequest parsedMessageBodyRequest;	
		
		try {
			parsedMessageBodyRequest = gson.fromJson(messageBodyRequest, BodyRequest.class);
			
			if (!CheckCreateOrDeleteDBRequest(parsedMessageBodyRequest)) {
				LOGGER.error("Invalid request");
				throw new RuntimeException("Invalid request");
			}
		}catch(JsonSyntaxException jsonException) {
			LOGGER.error("Invalid request. " + jsonException.getMessage());
			throw new Exception("Invalid request");	
		}
		
		try {		
			influxDB.query(new Query("DROP DATABASE "+ parsedMessageBodyRequest.getDb(), parsedMessageBodyRequest.getDb()));
		} catch(Exception e) {
			LOGGER.error("Error deleting database. " + e.getMessage());
			throw new Exception("Error deleting database");	
		} finally {
			influxDB.close();
		}
		influxDB.close();
	}
	
	public void insertMeasurement(String messageBodyRequest, String url) throws Exception{		
		InfluxDB influxDB = InfluxDBFactory.connect(url, "root", "root");	
		influxDB.enableBatch(BatchOptions.DEFAULTS);
		
		Gson gson = new GsonBuilder()
                .excludeFieldsWithoutExposeAnnotation()
                .setPrettyPrinting()
                .serializeNulls()	
                .create();
		BodyRequest parsedMessageBodyRequest;	
		JSONObject jsonObj;
		
		try {
			parsedMessageBodyRequest = gson.fromJson(messageBodyRequest, BodyRequest.class);
			if (!CheckInsertMeasurementRequest(parsedMessageBodyRequest)) {
				LOGGER.error("Invalid request");
				throw new RuntimeException("Invalid request");
			}
		}catch(JsonSyntaxException jsonException) {
			LOGGER.error("Invalid request. " + jsonException.getMessage());
			throw new Exception("Invalid request");	
		}		
		
		try {				
			IoTMeasurement measurement = parsedMessageBodyRequest.getData();
			
			jsonObj = new JSONObject(messageBodyRequest);			
			String observation = jsonObj.getJSONObject("data").getJSONObject("observation").toString();			
			
			Point point = Point
			        .measurement(parsedMessageBodyRequest.getTable())		
			        .addField("platformId", measurement.getPlatformId())
			        .addField("device", measurement.getDevice())
			        .addField("observation", observation)
			.build();
			
			influxDB.setDatabase(parsedMessageBodyRequest.getDb());
			influxDB.write(point);	
		}catch(Exception e) {
			LOGGER.error("Error inserting measurement. " + e.getMessage());
			throw new Exception("Error inserting measurement");	
		}finally {
			influxDB.close();
		}
		influxDB.close();
	}
	
	public String selectMeasurement(String messageBodyRequest, String url) throws Exception{
		Gson gson = new Gson();
		BodyRequest parsedMessageBodyRequest;	
		QueryResult queryResult;
		InfluxDB influxDB = InfluxDBFactory.connect(url, "root", "root");
		String measurementListString = null;
		
		try {
			parsedMessageBodyRequest = gson.fromJson(messageBodyRequest, BodyRequest.class);	
			
			if(!CheckSelectMeasurementRequest(parsedMessageBodyRequest)) {
				LOGGER.error("Invalid request");
				throw new RuntimeException("Invalid request");
			}
		} catch(JsonSyntaxException jsonException) {
			LOGGER.error("Invalid request. " + jsonException.getMessage());
			throw new Exception("Invalid request");	
		}		
		
		try {		
			DynamicMeasurement altered = new DynamicMeasurement(parsedMessageBodyRequest.getTable());
			AnnotationHelper.alterAnnotationOn(IoTMeasurement.class, Measurement.class, altered);

			queryResult = influxDB.query(new Query(parsedMessageBodyRequest.getQuery(), parsedMessageBodyRequest.getDb()));	
		}catch(Exception e) {
			LOGGER.error("Error selecting measurement. " + "Query: "+ parsedMessageBodyRequest.getQuery() +". " + e.getMessage());
			throw new Exception("Error selecting measurement");
		}finally {
			influxDB.close();
		}
		influxDB.close();
		
		InfluxDBResultMapper resultMapper = new InfluxDBResultMapper();
		try {
			List<IoTMeasurement> measurementList = resultMapper.toPOJO(queryResult, IoTMeasurement.class);
			Gson gson2 = new GsonBuilder().setPrettyPrinting().create();	
			measurementListString = gson2.toJson(measurementList);
		}catch(InfluxDBMapperException influxDBException) {
			LOGGER.error("Error mapping measurement. " + influxDBException.getMessage());
			throw new Exception("Error mapping measurement");
		}
		
		return measurementListString;
	}
	
	public void deleteMeasurement(String messageBodyRequest, String url) throws Exception{
		Gson gson = new Gson();
		BodyRequest parsedMessageBodyRequest;	
		
		InfluxDB influxDB = InfluxDBFactory.connect(url, "root", "root");	
		
		try {
			parsedMessageBodyRequest = gson.fromJson(messageBodyRequest, BodyRequest.class);
			if(!CheckDeleteMeasurementRequest(parsedMessageBodyRequest)) {
				LOGGER.error("Invalid request");
				throw new RuntimeException("Invalid request");
			}
		} catch(JsonSyntaxException jsonException) {
			LOGGER.error("Invalid request. " + jsonException.getMessage());
			throw new Exception("Invalid request");	
		}
		
		try {	
			Query queryResult = QueryBuilder.newQuery(parsedMessageBodyRequest.getQuery())
			        .forDatabase(parsedMessageBodyRequest.getDb())
			.create();
			
			influxDB.query(queryResult);
		} catch(Exception e) {
			LOGGER.error("Error deleting measurement. " + "Query: "+ parsedMessageBodyRequest.getQuery() +". " + e.getMessage());
			throw new Exception("error deleting measurement");		
		}finally {
			influxDB.close();
		}
		influxDB.close();
	}
	
	public void updateMeasurement(IoTMeasurement measurement, String url) {
		
	}	
	
	private boolean getParam(String query, String keyWord) {
		String[] array = query.split(" ");

		if (array[0].equals(keyWord.toUpperCase())  || array[0].equals(keyWord.toLowerCase())) {
			return true;	
		}
		return false;		
	}	
	
	private boolean CheckCreateOrDeleteDBRequest(BodyRequest request) {
		if (request.getDb() == null && request.getDb().trim().isEmpty()) {
			LOGGER.error("The field \"db\" is null or empty ");
			return false;
		}
		
		return true;			
	}	
	
	private boolean CheckInsertMeasurementRequest(BodyRequest request) {
		if(request.getDb() == null || request.getDb().trim().isEmpty()){
			LOGGER.error("The field \"db\" is null or empty ");
			return false;
		}
		
		if(request.getTable() == null || request.getTable().trim().isEmpty()){
			LOGGER.error("The field \"table\" is null or empty ");
			return false;
		}
		
		if(request.getData() == null){
			LOGGER.error("The field \"data\" is null ");
			return false;
		}
		
		if(request.getData().getDevice() == null || request.getData().getPlatformId() == null){	//request.getData().getObservation() == null
			LOGGER.error("At least one of the \"data\" subfields is null");
			return false;
		}	
		
		if(request.getData().getDevice().trim().isEmpty() || request.getData().getPlatformId().trim().isEmpty()){ //request.getData().getObservation().trim().isEmpty() 
			LOGGER.error("At least one of the \"data\" subfields is empty");
			return false;
		}	
		
		return true;			
	}	
	
	private boolean CheckSelectMeasurementRequest(BodyRequest request) {		
		if(request.getDb() == null || request.getDb().trim().isEmpty()){
			LOGGER.error("The field \"db\" is null or empty ");
			return false;
		}
		
		if(request.getTable() == null || request.getTable().trim().isEmpty()){
			LOGGER.error("The field \"table\" is null or empty ");
			return false;
		}
		
		if(request.getQuery() == null || request.getQuery().trim().isEmpty()){
			LOGGER.error("The field \"query\" is null or empty ");
			return false;
		}
		
		if (!getParam(request.getQuery(), "SELECT")) {
			LOGGER.error("\"SELECT\" is not included in the query");
			return false;
		}
		
		return true;			
	}	
	
	private boolean CheckDeleteMeasurementRequest(BodyRequest request) {		
		if(request.getDb() == null || request.getDb().trim().isEmpty()){
			LOGGER.error("The field \"db\" is null or empty ");
			return false;
		}
		
		if(request.getTable() == null || request.getTable().trim().isEmpty()){
			LOGGER.error("The field \"table\" is null or empty ");
			return false;
		}
		
		if(request.getQuery() == null || request.getQuery().trim().isEmpty()){
			LOGGER.error("The field \"query\" is null or empty ");
			return false;
		}
		
		
		if (!getParam(request.getQuery(), "DELETE")) {
			LOGGER.error("\"DELETE\" is not included in the query");
			return false;
		}
		
		return true;			
	}	
	
}
