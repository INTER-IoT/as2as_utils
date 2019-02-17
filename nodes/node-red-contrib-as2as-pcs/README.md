## Assumptions

In order to use the valenciaportPCS node, the following nodes are required: `xmlhttprequest`, `xmldom`, `xml2json` and `dateformat`.

## Install

Coply de node in the path:

```bash
npm\node_modules\node-red\nodes
```

and copy the image pcs_logo_32x32.png in the path:

```bash
npm\node_modules\node-red\public\icons
```

## Use

The node node-red-PCS provides information about the port calls in the ports managed by the Valencia Port Authority: Valencia, Gandia and Sagunto. It contains two different nodes: pcs-portcall and pcs-search.

### pcs-portcall
Get the port call data from PCS

#### Input data

```
{ 
	..., 
	"portCallNumber": "1201700951",
	...
}
```

#### Output tdata

```
{ 
	...,
	portCall:{ 
		PortCall: '1201700951',
		Status: 'PRV',
		Vessel: 'MSC LAUSANNE',
		Voyage: 'ME708W / ME708W',
		IMO: '9320398',
		MMSI: '229384000',
		CallSign: '9HA3289',
		VesselFlag: 'MALTA',
		VesselBuildingDate: '11/11/2005 00:00',
		InternationalNavigation: 'True',
		VesselType: 'PORTACONTENEDOR',
		VesselGT: '62702,00',
		VesselBeam: '32,20',
		VesselLength: '283,00',
		VesselMaximumDraught: '13,52',
		SummaryDeclaration: '46117500951',
		SummaryRegistrationDate: '13/02/2017 12:50',
		SummaryActivationDate: {},
		ETA: '04/03/2017 23:00',
		ATA: {},
		ETD: '05/03/2017 22:00',
		ATD: {},
		PreviousPortOfCallName: 'GENOVA',
		PortOfCallName: 'VALENCIA',
		NextPortOfCallName: 'ALGECIRAS',
		RegularLine: 'UNITED STATES-NOR.ATL.(USAN-2M)(MSC)',
		VesselAgentName: 'M.S.C. ESPAÑA, S.L.U.',
		VesselAgentCif: 'B98261944',
		VesselAgentAddress: 'CL SUIZA, 12 46024 VALENCIA (VALENCIA)',
		VesselAgentPhone: '96 3359100',
		VesselAgentFax: '96 3359129',
		ShipOwner: 'Msc Mediterranean Shipping',
		ShipOwnerCif: {},
		LoadCarrierAgent: [ 'M.S.C. ESPAÑA, S.L.U.', 'MAERSK SPAIN,S.L.U,' ],
		UnloadCarrierAgent:
			[ 'M.S.C. ESPAÑA, S.L.U.',
			'M.S.C. ESPAÑA, S.L.U.',
			'MAERSK SPAIN,S.L.U,' ]
	} 
}
```

### pcs-search
Get a list of port calls from PCS

#### Input data

```
{ 
	"dateFrom": "2017-03-01T01:00:00.000Z", 
	"dateTo": "2017-03-01T23:00:00.000Z", 
	"vesselName": "", 
	"portOfValencia": true, 
	"portOfGandia": true, 
	"portOfSagunto": true, 
	"statusPRV": true, 
	"statusOPE": true, 
	"statusAUT": true, 
	"statusFIN": true 
}
```

#### Output tdata

```
[{
	Vessel: 'VEGA HERCULES',
	Voyage: '0618KS / 0618KS',
	PortCall: '1201701221',
	Status: 'FIN',
	EstimatedTimeArrival: '28/02/2017 12:22',
	ActualTimeArrival: '01/03/2017 22:40',
	EstimatedTimeDeparture: '03/03/2017 09:00',
	ActualTimeDeparture: '03/03/2017 10:00',
	SummaryActivationDate: '01/03/2017 22:40',
	DestinationPort: 'VLC',
	Terminal: 'TCV STEVEDORING COMPANY, S.A.',
	VesselAgent: 'CMA CGM IBERICA,S.A.',
	RegularLine: 'CMA NEW South Europe-Algerian Service',
	CarrierAgent: 'CMA CGM IBERICA,S.A.' 
},
{ 
	Vessel: 'ZURBARAN',
	Voyage: '43 / 43',
	PortCall: '1201701061',
	Status: 'FIN',
	EstimatedTimeArrival: '01/03/2017 19:30',
	ActualTimeArrival: '01/03/2017 19:40',
	EstimatedTimeDeparture: '01/03/2017 23:00',
	ActualTimeDeparture: '01/03/2017 23:05',
	SummaryActivationDate: '01/03/2017 19:40',
	DestinationPort: 'VLC',
	Terminal: 'CIA. TRASMEDITERRANEA, S.A.',
	VesselAgent: 'CIA. TRASMEDITERRANEA, S.A.',
	RegularLine: 'TRASMEDITERRANEA-SERVICIO BALEARES',
	CarrierAgent: 'CIA. TRASMEDITERRANEA, S.A.'  
}]
```

