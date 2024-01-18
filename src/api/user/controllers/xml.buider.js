const builder = require('xmlbuilder');

function generateXML(data) {
  var vendObj = {
    'soapenv:Envelope': {
      '@xmlns:soapenv': 'http://schemas.xmlsoap.org/soap/envelope/',
      '@xmlns:xsd': 'http://hostif.vtm.prism.co.za/xsd',
      'soapenv:Header': '',
      'soapenv:Body': {
        'xsd:vend': {
          'xsd:origMsisdn': data.origMsisdn,
          'xsd:destMsisdn': data.destMsisdn,
          'xsd:amount': data.amount,
          'xsd:sequence': data.sequence,
          'xsd:tariffTypeId': data.tariffTypeId,
          'xsd:serviceproviderId': data.serviceproviderId
        }
      }
    }
  };

  var xml = builder
    .create(vendObj, { encoding: 'UTF-8', standalone: false })
    .end({ pretty: true });
  return xml;
}

function generateStatusXml(data) {
  let vendObj = {
    'soapenv:Envelope': {
      '@xmlns:soapenv': 'http://schemas.xmlsoap.org/soap/envelope/',
      '@xmlns:xsd': 'http://hostif.vtm.prism.co.za/xsd',
      'soapenv:Header': '',
      'soapenv:Body': {
        'xsd:querytx': {
          'xsd:txRef': data.txRef
        }
      }
    }
  };

  var xml = builder
    .create(vendObj, { encoding: 'UTF-8', standalone: false })
    .end({ pretty: true });
  return xml;
}
module.exports = { generateXML, generateStatusXml };
