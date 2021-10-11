export type AttributeType =
	| (
			| 'String'
			| 'NonEmptyString'
			| 'Boolean'
			| 'Function'
			| 'Date'
			| 'Int'
			| 'Uint'
			| 'Float'
			| 'NonZeroUint'
			| 'AcceptList'
			| 'AutoComplete'
			| 'BCP47'
			| 'Color'
			| 'ColSpan'
			| 'Coords'
			| 'Crossorigin'
			| 'DateTime'
			| 'Destination'
			| 'DOMID'
			| 'DOMIDList'
			| 'ItemType'
			| 'LinkSizes'
			| 'LinkType'
			| 'LinkTypeList'
			| 'MediaQuery'
			| 'MediaQueryList'
			| 'MIMEType'
			| 'ReferrerPolicy'
			| 'RowSpan'
			| 'SourceSizeList'
			| 'SrcSet'
			| 'TabIndex'
			| 'Target'
			| 'URL'
			| 'URLHash'
			| 'URLList'
	  )
	| {
			enum: string[];
	  };
