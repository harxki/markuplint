/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * If `false`, this mean is "No corresponding role".
 */
export type ImplicitRole = false | string;
/**
 * If `true`, this mean is "Any". If `false`, this mean is "No".
 */
export type PermittedRoles =
	| boolean
	| (
			| string
			| {
					name: string;
					deprecated?: true;
					[k: string]: unknown;
			  }
	  )[]
	| PermittedARIAAAMInfo;
/**
 * If set false:
 * > No role or aria-* attributes
 */
export type PermittedARIAProperties =
	| false
	| {
			global?: true;
			/**
			 * Set true if the spec says "and any aria-* attributes applicable to the allowed roles."
			 */
			role?: true | string | [string, ...string[]];
			/**
			 * @minItems 1
			 */
			only?: [
				(
					| string
					| {
							name: string;
							value?: string;
					  }
				),
				...(
					| string
					| {
							name: string;
							value?: string;
					  }
				)[],
			];
			/**
			 * @minItems 1
			 */
			without?: [
				{
					type: 'not-recommended' | 'should-not' | 'must-not';
					name: string;
					value?: string;
					alt?: {
						method: 'remove-attr' | 'set-attr';
						target: string;
					};
				},
				...{
					type: 'not-recommended' | 'should-not' | 'must-not';
					name: string;
					value?: string;
					alt?: {
						method: 'remove-attr' | 'set-attr';
						target: string;
					};
				}[],
			];
	  };

export interface AriaSchema {
	_?: ARIA;
	[k: string]: unknown;
}
export interface ARIA {
	implicitRole: ImplicitRole;
	permittedRoles: PermittedRoles;
	namingProhibited?: true;
	implicitProperties?: ImplicitProperties;
	properties?: PermittedARIAProperties;
	conditions?: {
		/**
		 * This interface was referenced by `undefined`'s JSON-Schema definition
		 * via the `patternProperty` ".+".
		 */
		[k: string]: {
			implicitRole?: ImplicitRole;
			permittedRoles?: PermittedRoles;
			namingProhibited?: true;
			implicitProperties?: ImplicitProperties;
			properties?: PermittedARIAProperties;
		};
	};
	'1.3'?: {
		implicitRole?: ImplicitRole;
		permittedRoles?: PermittedRoles;
		namingProhibited?: true;
		implicitProperties?: ImplicitProperties;
		properties?: PermittedARIAProperties;
		conditions?: {
			/**
			 * This interface was referenced by `undefined`'s JSON-Schema definition
			 * via the `patternProperty` ".+".
			 */
			[k: string]: {
				implicitRole?: ImplicitRole;
				permittedRoles?: PermittedRoles;
				namingProhibited?: true;
				implicitProperties?: ImplicitProperties;
				properties?: PermittedARIAProperties;
			};
		};
	};
	'1.2'?: {
		implicitRole?: ImplicitRole;
		permittedRoles?: PermittedRoles;
		namingProhibited?: true;
		implicitProperties?: ImplicitProperties;
		properties?: PermittedARIAProperties;
		conditions?: {
			/**
			 * This interface was referenced by `undefined`'s JSON-Schema definition
			 * via the `patternProperty` ".+".
			 */
			[k: string]: {
				implicitRole?: ImplicitRole;
				permittedRoles?: PermittedRoles;
				namingProhibited?: true;
				implicitProperties?: ImplicitProperties;
				properties?: PermittedARIAProperties;
			};
		};
	};
	'1.1'?: {
		implicitRole?: ImplicitRole;
		permittedRoles?: PermittedRoles;
		implicitProperties?: ImplicitProperties;
		properties?: PermittedARIAProperties;
		conditions?: {
			/**
			 * This interface was referenced by `undefined`'s JSON-Schema definition
			 * via the `patternProperty` ".+".
			 */
			[k: string]: {
				implicitRole?: ImplicitRole;
				permittedRoles?: PermittedRoles;
				implicitProperties?: ImplicitProperties;
				properties?: PermittedARIAProperties;
			};
		};
	};
}
export interface PermittedARIAAAMInfo {
	'core-aam'?: true;
	'graphics-aam'?: true;
}
export interface ImplicitProperties {
	/**
	 * This interface was referenced by `ImplicitProperties`'s JSON-Schema definition
	 * via the `patternProperty` "^aria-.+".
	 */
	[k: string]: string;
}
