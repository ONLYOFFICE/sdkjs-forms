/*
 * Copyright (C) Ascensio System SIA, 2009-2026
 *
 * This program is a free software product. You can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License (AGPL)
 * version 3 as published by the Free Software Foundation, together with the
 * additional terms provided in the LICENSE file.
 *
 * This program is distributed WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. For
 * details, see the GNU AGPL at: https://www.gnu.org/licenses/agpl-3.0.html
 *
 * You can contact Ascensio System SIA by email at info@onlyoffice.com
 * or by postal mail at 20A-6 Ernesta Birznieka-Upisha Street, Riga,
 * LV-1050, Latvia, European Union.
 *
 * The interactive user interfaces in modified versions of the Program
 * are required to display Appropriate Legal Notices in accordance with
 * Section 5 of the GNU AGPL version 3.
 *
 * No trademark rights are granted under this License.
 *
 * All non-code elements of the Product, including illustrations,
 * icon sets, and technical writing content, are licensed under the
 * Creative Commons Attribution-ShareAlike 4.0 International License:
 * https://creativecommons.org/licenses/by-sa/4.0/legalcode
 *
 * This license applies only to such non-code elements and does not
 * modify or replace the licensing terms applicable to the Program's
 * source code, which remains licensed under the GNU Affero General
 * Public License v3.
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

"use strict";

(function(window)
{
	window['AscDFH'].historyitem_OForm_FieldGroup_Weight         = window['AscDFH'].historyitem_type_OForm_FieldGroup | 1;
	window['AscDFH'].historyitem_OForm_FieldGroup_AddRemoveField = window['AscDFH'].historyitem_type_OForm_FieldGroup | 2;
	window['AscDFH'].historyitem_OForm_FieldGroup_AddRemoveUser  = window['AscDFH'].historyitem_type_OForm_FieldGroup | 3;
	window['AscDFH'].historyitem_OForm_FieldGroup_Filled         = window['AscDFH'].historyitem_type_OForm_FieldGroup | 4;
	window['AscDFH'].historyitem_OForm_FieldGroup_Date           = window['AscDFH'].historyitem_type_OForm_FieldGroup | 5;

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
			this.Class.onChange();
		},
		false
	);
	window['AscDFH'].CChangesOFormFieldGroupWeight = CChangesOFormFieldGroupWeight;

	/**
	 * @constructor
	 * @extends {window['AscDFH'].CChangesDictionaryBase}
	 */
	function CChangesOFormFieldGroupAddRemoveField(Class, fieldId, isAdd)
	{
		window['AscDFH'].CChangesDictionaryBase.call(this, Class, fieldId, isAdd);
	}
	window['AscDFH'].InheritDictionaryChange(
		CChangesOFormFieldGroupAddRemoveField,
		window['AscDFH'].historyitem_OForm_FieldGroup_AddRemoveField,
		function()
		{
			let field = AscCommon.g_oTableId.GetById(this.Key);
			if (-1 === this.Class.Fields.indexOf(field))
				this.Class.Fields.push(field);
			
			this.Class.onChange();
		},
		function()
		{
			let field  = AscCommon.g_oTableId.GetById(this.Key);
			let index = this.Class.Fields.indexOf(field);
			if (-1 !== index)
				this.Class.Fields.splice(index, 1);
			
			this.Class.onChange();
		}
	);
	window['AscDFH'].CChangesOFormFieldGroupAddRemoveField = CChangesOFormFieldGroupAddRemoveField;
	
	/**
	 * @constructor
	 * @extends {window['AscDFH'].CChangesDictionaryBase}
	 */
	function CChangesOFormFieldGroupAddRemoveUser(Class, userMasterId, isAdd)
	{
		window['AscDFH'].CChangesDictionaryBase.call(this, Class, userMasterId, isAdd);
	}
	window['AscDFH'].InheritDictionaryChange(
		CChangesOFormFieldGroupAddRemoveUser,
		window['AscDFH'].historyitem_OForm_FieldGroup_AddRemoveUser,
		function()
		{
			let userMaster = AscCommon.g_oTableId.GetById(this.Key);
			if (-1 === this.Class.Users.indexOf(userMaster))
				this.Class.Users.push(userMaster);
			
			this.Class.onChange();
		},
		function()
		{
			let userMaster = AscCommon.g_oTableId.GetById(this.Key);
			let index      = this.Class.Fields.indexOf(userMaster);
			if (-1 !== index)
				this.Class.Users.splice(index, 1);
			
			this.Class.onChange();
		}
	);
	window['AscDFH'].CChangesOFormFieldGroupAddRemoveUser = CChangesOFormFieldGroupAddRemoveUser;
	
	/**
	 * @constructor
	 * @extends {window['AscDFH'].CChangesBaseBoolProperty}
	 */
	function CChangesOFormFieldGroupFilled(Class, Old, New)
	{
		window['AscDFH'].CChangesBaseBoolProperty.call(this, Class, Old, New);
	}
	window['AscDFH'].InheritPropertyChange(
		CChangesOFormFieldGroupFilled,
		window['AscDFH'].CChangesBaseBoolProperty,
		window['AscDFH'].historyitem_OForm_FieldGroup_Filled,
		function(value)
		{
			this.Class.Filled = value;
			this.Class.onChangeFilled();
		},
		false
	);
	window['AscDFH'].CChangesOFormFieldGroupFilled = CChangesOFormFieldGroupFilled;
	
	/**
	 * @constructor
	 * @extends {window['AscDFH'].CChangesBaseStringProperty}
	 */
	function CChangesOFormFieldGroupDate(Class, Old, New)
	{
		window['AscDFH'].CChangesBaseStringProperty.call(this, Class, Old, New);
	}
	window['AscDFH'].InheritPropertyChange(
		CChangesOFormFieldGroupDate,
		window['AscDFH'].CChangesBaseStringProperty,
		window['AscDFH'].historyitem_OForm_FieldGroup_Date,
		function(value)
		{
			let v = parseInt(value);
			this.Class.Date = isNaN(v) ? undefined : v;
		},
		false
	);
	window['AscDFH'].CChangesOFormFieldGroupDate = CChangesOFormFieldGroupDate;
	
})(window);
