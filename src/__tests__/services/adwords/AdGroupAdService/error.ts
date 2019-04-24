const error = {
  ApiExceptionFault: {
    message:
      "[EntityNotFound.INVALID_ID @ operations[0].operand.ad.id; trigger:'<null>', EntityNotFound.INVALID_ID @ operations[1].operand.ad.id; trigger:'<null>']",
    'ApplicationException.Type': 'ApiException',
    errors: [
      {
        attributes: { 'xsi:type': 'EntityNotFound' },
        fieldPath: 'operations[0].operand.ad.id',
        fieldPathElements: [{ field: 'operations', index: 0 }, { field: 'operand' }, { field: 'ad' }, { field: 'id' }],
        trigger: '<null>',
        errorString: 'EntityNotFound.INVALID_ID',
        'ApiError.Type': 'EntityNotFound',
        reason: 'INVALID_ID'
      },
      {
        attributes: { 'xsi:type': 'EntityNotFound' },
        fieldPath: 'operations[1].operand.ad.id',
        fieldPathElements: [{ field: 'operations', index: 1 }, { field: 'operand' }, { field: 'ad' }, { field: 'id' }],
        trigger: '<null>',
        errorString: 'EntityNotFound.INVALID_ID',
        'ApiError.Type': 'EntityNotFound',
        reason: 'INVALID_ID'
      }
    ]
  }
};
