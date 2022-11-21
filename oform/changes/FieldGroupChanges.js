/*
 * (c) Copyright Ascensio System SIA 2010-2019
 *
 * This program is a free software product. You can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License (AGPL)
 * version 3 as published by the Free Software Foundation. In accordance with
 * Section 7(a) of the GNU AGPL its Section 15 shall be amended to the effect
 * that Ascensio System SIA expressly excludes the warranty of non-infringement
 * of any third-party rights.
 *
 * This program is distributed WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR  PURPOSE. For
 * details, see the GNU AGPL at: http://www.gnu.org/licenses/agpl-3.0.html
 *
 * You can contact Ascensio System SIA at 20A-12 Ernesta Birznieka-Upisha
 * street, Riga, Latvia, EU, LV-1050.
 *
 * The  interactive user interfaces in modified source and object code versions
 * of the Program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU AGPL version 3.
 *
 * Pursuant to Section 7(b) of the License you must retain the original Product
 * logo when distributing the program. Pursuant to Section 7(e) we decline to
 * grant you any rights under trademark law for use of our trademarks.
 *
 * All the Product's GUI elements, including illustrations and icon sets, as
 * well as technical writing content are licensed under the terms of the
 * Creative Commons Attribution-ShareAlike 4.0 International. See the License
 * terms at http://creativecommons.org/licenses/by-sa/4.0/legalcode
 *
 */

"use strict";

(function(window)
{
	window['AscDFH'].historyitem_OForm_FieldGroup_Weight      = window['AscDFH'].historyitem_type_OForm_FieldGroup | 1;
	window['AscDFH'].historyitem_OForm_FieldGroup_AddField    = window['AscDFH'].historyitem_type_OForm_FieldGroup | 2;
	window['AscDFH'].historyitem_OForm_FieldGroup_RemoveField = window['AscDFH'].historyitem_type_OForm_FieldGroup | 3;

	/**
	 * @constructor
	 * @extends {window['AscDFH'].CChangesBaseLongProperty}
	 */
	function CChangesOFormFieldGroupWeight(Class, Old, New)
	{
		window['AscDFH'].CChangesBaseLongProperty.call(this, Class, Old, New);
	}
	window['AscDFH'].InheritPropertyChange(
		CChangesOFormFieldGroupWeight,
		window['AscDFH'].CChangesBaseLongProperty,
		window['AscDFH'].historyitem_OForm_FieldGroup_Weight,
		function(value)
		{
			this.Class.Weight = value;
		},
		false
	);
	window['AscDFH'].CChangesOFormFieldGroupWeight = CChangesOFormFieldGroupWeight;

	/**
	 * @constructor
	 * @extends {window['AscDFH'].CChangesDictionaryBase}
	 */
	function CChangesOFormFieldGroupAddField(Class, fieldId)
	{
		window['AscDFH'].CChangesDictionaryBase.call(this, Class, fieldId);
	}
	InheritUserChange(
		CChangesOFormFieldGroupAddField,
		window['AscDFH'].historyitem_OForm_FieldGroup_AddField,
		function()
		{
			let field = AscCommon.g_oTableId.GetById(this.Key);
			if (-1 === this.Class.Fields.indexOf(field))
				this.Class.Fields.push(field);
		},
		function()
		{
			let field  = AscCommon.g_oTableId.GetById(this.Key);
			let index = this.Class.Fields.indexOf(field);
			if (-1 !== index)
				this.Class.Fields.splice(index, 1);
		}
	);
	window['AscDFH'].CChangesOFormFieldGroupAddField = CChangesOFormFieldGroupAddField;

	/**
	 * @constructor
	 * @extends {window['AscDFH'].CChangesDictionaryBase}
	 */
	function CChangesOFormFieldGroupRemoveField(Class, fieldId)
	{
		window['AscDFH'].CChangesDictionaryBase.call(this, Class, fieldId);
	}
	InheritUserChange(
		CChangesOFormFieldGroupRemoveField,
		window['AscDFH'].historyitem_OForm_FieldGroup_RemoveField,
		function()
		{
			let field  = AscCommon.g_oTableId.GetById(this.Key);
			let index = this.Class.Fields.indexOf(field);
			if (-1 !== index)
				this.Class.Fields.splice(index, 1);
		},
		function()
		{
			let field = AscCommon.g_oTableId.GetById(this.Key);
			if (-1 === this.Class.Fields.indexOf(field))
				this.Class.Fields.push(field);
		}
	);
	window['AscDFH'].CChangesOFormFieldGroupRemoveField = CChangesOFormFieldGroupRemoveField;

})(window);