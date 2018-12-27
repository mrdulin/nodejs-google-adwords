import { pd } from 'pretty-data';

import { SoapService } from '../core';
import { ISelector, PredicateOperator, IPaging } from '../../models/adwords';
import * as Ad from '../../models/adwords/Ad';
import { AdwordsOperartionService } from './AdwordsOperationService';

interface IAdGroupAdServiceOpts {
  soapService: SoapService;
}

class AdGroupAdService extends AdwordsOperartionService {
  /**
   * https://developers.google.com/adwords/api/docs/appendix/selectorfields#v201809-AdGroupAdService
   *
   * @private
   * @static
   * @memberof AdGroupAdService
   */
  private static readonly selectorFields = [
    'AccentColor',
    'AdGroupId',
    'AdStrengthInfo',
    'AdType',
    'AdvertisingId',
    'AllowFlexibleColor',
    'Automated',
    'BaseAdGroupId',
    'BaseCampaignId',
    'BusinessName',
    'CallOnlyAdBusinessName',
    'CallOnlyAdCallTracked',
    'CallOnlyAdConversionTypeId',
    'CallOnlyAdCountryCode',
    'CallOnlyAdDescription1',
    'CallOnlyAdDescription2',
    'CallOnlyAdDisableCallConversion',
    'CallOnlyAdPhoneNumber',
    'CallOnlyAdPhoneNumberVerificationUrl',
    'CallToActionText',
    'CreationTime',
    'CreativeFinalAppUrls',
    'CreativeFinalMobileUrls',
    'CreativeFinalUrlSuffix',
    'CreativeFinalUrls',
    'CreativeTrackingUrlTemplate',
    'CreativeUrlCustomParameters',
    'Description',
    'Description1',
    'Description2',
    'DevicePreference',
    'Dimensions',
    'DisplayUploadAdGmailTeaserBusinessName',
    'DisplayUploadAdGmailTeaserDescription',
    'DisplayUploadAdGmailTeaserHeadline',
    'DisplayUploadAdGmailTeaserLogoImage',
    'DisplayUrl',
    'ExpandedDynamicSearchCreativeDescription2',
    'ExpandedTextAdDescription2',
    'ExpandedTextAdHeadlinePart3',
    'ExpandingDirections',
    'FileSize',
    'FormatSetting',
    'GmailHeaderImage',
    'GmailMarketingImage',
    'GmailTeaserBusinessName',
    'GmailTeaserDescription',
    'GmailTeaserHeadline',
    'GmailTeaserLogoImage',
    'Headline',
    'HeadlinePart1',
    'HeadlinePart2',
    'Height',
    'Id',
    'ImageCreativeName',
    'IndustryStandardCommercialIdentifier',
    'IsCookieTargeted',
    'IsTagged',
    'IsUserInterestTargeted',
    'Labels',
    'LandscapeLogoImage',
    'LogoImage',
    'LongHeadline',
    'MainColor',
    'MarketingImage',
    'MarketingImageCallToActionText',
    'MarketingImageCallToActionTextColor',
    'MarketingImageDescription',
    'MarketingImageHeadline',
    'MediaId',
    'MimeType',
    'MultiAssetResponsiveDisplayAdAccentColor',
    'MultiAssetResponsiveDisplayAdAllowFlexibleColor',
    'MultiAssetResponsiveDisplayAdBusinessName',
    'MultiAssetResponsiveDisplayAdCallToActionText',
    'MultiAssetResponsiveDisplayAdDescriptions',
    'MultiAssetResponsiveDisplayAdDynamicSettingsPricePrefix',
    'MultiAssetResponsiveDisplayAdDynamicSettingsPromoText',
    'MultiAssetResponsiveDisplayAdFormatSetting',
    'MultiAssetResponsiveDisplayAdHeadlines',
    'MultiAssetResponsiveDisplayAdLandscapeLogoImages',
    'MultiAssetResponsiveDisplayAdLogoImages',
    'MultiAssetResponsiveDisplayAdLongHeadline',
    'MultiAssetResponsiveDisplayAdMainColor',
    'MultiAssetResponsiveDisplayAdMarketingImages',
    'MultiAssetResponsiveDisplayAdSquareMarketingImages',
    'MultiAssetResponsiveDisplayAdYouTubeVideos',
    'Path1',
    'Path2',
    'PolicySummary',
    'PricePrefix',
    'ProductImages',
    'ProductVideoList',
    'PromoText',
    'ReadyToPlayOnTheWeb',
    'ReferenceId',
    'ResponsiveSearchAdDescriptions',
    'ResponsiveSearchAdHeadlines',
    'ResponsiveSearchAdPath1',
    'ResponsiveSearchAdPath2',
    'RichMediaAdCertifiedVendorFormatId',
    'RichMediaAdDuration',
    'RichMediaAdImpressionBeaconUrl',
    'RichMediaAdName',
    'RichMediaAdSnippet',
    'RichMediaAdSourceUrl',
    'RichMediaAdType',
    'ShortHeadline',
    'SourceUrl',
    'SquareMarketingImage',
    'Status',
    'SystemManagedEntitySource',
    'TemplateAdDuration',
    'TemplateAdName',
    'TemplateAdUnionId',
    'TemplateElementFieldName',
    'TemplateElementFieldText',
    'TemplateElementFieldType',
    'TemplateId',
    'TemplateOriginAdId',
    'UniqueName',
    'UniversalAppAdDescriptions',
    'UniversalAppAdHeadlines',
    'UniversalAppAdHtml5MediaBundles',
    'UniversalAppAdImages',
    'UniversalAppAdMandatoryAdText',
    'UniversalAppAdYouTubeVideos',
    'Url',
    'UrlData',
    'Urls',
    'VideoTypes',
    'Width',
    'YouTubeVideoIdString'
  ];

  private soapService: SoapService;
  private constructor(options: IAdGroupAdServiceOpts) {
    super();
    this.soapService = options.soapService;
  }

  public async getAll() {
    const serviceSelector: ISelector = {
      fields: AdGroupAdService.selectorFields
    };
    return this.get(serviceSelector);
  }

  public async getAllMultiAssetResponsiveDisplayAd() {
    const serviceSelector: ISelector = {
      fields: AdGroupAdService.selectorFields,
      predicates: [
        {
          field: 'AdType',
          operator: PredicateOperator.IN,
          values: [Ad.Type.MULTI_ASSET_RESPONSIVE_DISPLAY_AD]
        }
      ]
    };
    return this.get(serviceSelector);
  }

  public async getAllExpandedTextAd(pageing?: IPaging) {
    const serviceSelector: ISelector = {
      fields: AdGroupAdService.selectorFields,
      predicates: [
        {
          field: 'AdType',
          operator: PredicateOperator.IN,
          values: [Ad.Type.EXPANDED_TEXT_AD]
        }
      ]
    };
    if (pageing) {
      serviceSelector.paging = pageing;
    }
    return this.get(serviceSelector);
  }

  protected async get<ServiceSelector = ISelector, Response = any>(
    serviceSelector: ServiceSelector
  ): Promise<Response> {
    return this.soapService.get<ServiceSelector, Response>(serviceSelector).then(response => {
      console.log('get Ad Group ads successfully. response: ', pd.json(response));
      return response;
    });
  }
}

export { AdGroupAdService };
