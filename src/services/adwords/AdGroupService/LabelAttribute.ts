interface ILabelAttribute {
  'LabelAttribute.Type'?: string;
}

interface IDisplayAttribute extends ILabelAttribute {
  backgroundColor: string;
  description: string;
}

export { ILabelAttribute, IDisplayAttribute };
