import { XMLService } from '../../../services/core';

describe('XMLService test suites', () => {
  it('#extractValueFromElement', () => {
    const xml = `
      <soap:Header>
        <ResponseHeader
          xmlns="https://adwords.google.com/api/adwords/cm/v201809">
          <requestId>0005876b262ca2c20a012611a6063c50</requestId>
          <serviceName>CampaignService</serviceName>
          <methodName>get</methodName>
          <operations>1</operations>
          <responseTime>373</responseTime>
        </ResponseHeader>
      </soap:Header>
    `;
    const responseTime = XMLService.extractValueFromElement(xml, 'responseTime');
    const operations = XMLService.extractValueFromElement(xml, 'operations');
    const requestId = XMLService.extractValueFromElement(xml, 'requestId');
    expect(responseTime).toBe('373');
    expect(operations).toBe('1');
    expect(requestId).toBe('0005876b262ca2c20a012611a6063c50');
  });
});
