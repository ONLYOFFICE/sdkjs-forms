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
	window['AscDFH'].historyitem_OFormFieldMaster_FieldId         = window['AscDFH'].historyitem_type_OForm_FieldMaster | 1;
	window['AscDFH'].historyitem_OFormFieldMaster_AddRemoveUser   = window['AscDFH'].historyitem_type_OForm_FieldMaster | 2;
	window['AscDFH'].historyitem_OFormFieldMaster_AddRemoveSigner = window['AscDFH'].historyitem_type_OForm_FieldMaster | 3;

	/**
	 * @constructor
	 * @extends {window['AscDFH'].CChangesBaseStringProperty}
	 */
	function CChangesOFormFieldMasterFieldId(Class, Old, New)
	{
		window['AscDFH'].CChangesBaseStringProperty.call(this, Class, Old, New);
	}
	window['AscDFH'].InheritPropertyChange(
		CChangesOFormFieldMasterFieldId,
		window['AscDFH'].CChangesBaseStringProperty,
		window['AscDFH'].historyitem_OFormFieldMaster_FieldId,
		function(value)
		{
			this.Class.FieldId = value;
		},
		false
	);
	window['AscDFH'].CChangesOFormFieldMasterFieldId = CChangesOFormFieldMasterFieldId;

	/**
	 * @constructor
	 * @extends {window['AscDFH'].CChangesDictionaryBase}
	 */
	function CChangesOFormFieldMasterAddRemoveUser(Class, userId, isAdd)
	{
		window['AscDFH'].CChangesDictionaryBase.call(this, Class, userId, isAdd);
	}
	window['AscDFH'].InheritDictionaryChange(
		CChangesOFormFieldMasterAddRemoveUser,
		window['AscDFH'].historyitem_OFormFieldMaster_AddRemoveUser,
		function()
		{
			let user = AscCommon.g_oTableId.GetById(this.Key);
			if (-1 === this.Class.Users.indexOf(user))
				this.Class.Users.push(user);
		},
		function()
		{
			let user  = AscCommon.g_oTableId.GetById(this.Key);
			let index = this.Class.Users.indexOf(user);
			if (-1 !== index)
				this.Class.Users.splice(index, 1);
		}
	);
	window['AscDFH'].CChangesOFormFieldMasterAddRemoveUser = CChangesOFormFieldMasterAddRemoveUser;

	/**
	 * @constructor
	 * @extends {window['AscDFH'].CChangesDictionaryBase}
	 */
	function CChangesOFormFieldMasterAddRemoveSigner(Class, userId, isAdd)
	{
		window['AscDFH'].CChangesDictionaryBase.call(this, Class, userId, isAdd);
	}
	window['AscDFH'].InheritDictionaryChange(
		CChangesOFormFieldMasterAddRemoveSigner,
		window['AscDFH'].historyitem_OFormFieldMaster_AddSigner,
		function()
		{
			let user = AscCommon.g_oTableId.GetById(this.Key);
			if (-1 === this.Class.Signers.indexOf(user))
				this.Class.Signers.push(user);
		},
		function()
		{
			let user  = AscCommon.g_oTableId.GetById(this.Key);
			let index = this.Class.Signers.indexOf(user);
			if (-1 !== index)
				this.Class.Signers.splice(index, 1);
		}
	);
	window['AscDFH'].CChangesOFormFieldMasterAddRemoveSigner = CChangesOFormFieldMasterAddRemoveSigner;

})(window);
