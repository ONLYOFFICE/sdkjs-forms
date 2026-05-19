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
	window['AscDFH'].historyitem_OForm_User_UserMaster = window['AscDFH'].historyitem_type_OForm_User | 1;
	window['AscDFH'].historyitem_OForm_User_Email      = window['AscDFH'].historyitem_type_OForm_User | 2;
	window['AscDFH'].historyitem_OForm_User_Telephone  = window['AscDFH'].historyitem_type_OForm_User | 3;

	/**
	 * @constructor
	 * @extends {window['AscDFH'].CChangesBaseStringProperty}
	 */
	function CChangesOFormUserUserMaster(Class, Old, New)
	{
		window['AscDFH'].CChangesBaseStringProperty.call(this, Class, Old, New);
	}
	window['AscDFH'].InheritPropertyChange(
		CChangesOFormUserUserMaster,
		window['AscDFH'].CChangesBaseStringProperty,
		window['AscDFH'].historyitem_OForm_User_UserMaster,
		function(value)
		{
			if (!value)
			{
				this.Class.UserMaster = undefined;
			}
			else
			{
				let userMaster = AscCommon.g_oTableId.Get_ById(value);
				if (userMaster)
					this.Class.UserMaster = userMaster;
			}
		},
		false
	);
	window['AscDFH'].CChangesOFormUserUserMaster = CChangesOFormUserUserMaster;

	/**
	 * @constructor
	 * @extends {window['AscDFH'].CChangesBaseStringProperty}
	 */
	function CChangesOFormUserEmail(Class, Old, New)
	{
		window['AscDFH'].CChangesBaseStringProperty.call(this, Class, Old, New);
	}
	window['AscDFH'].InheritPropertyChange(
		CChangesOFormUserEmail,
		window['AscDFH'].CChangesBaseStringProperty,
		window['AscDFH'].historyitem_OForm_User_Email,
		function(value)
		{
			this.Class.Email = value;
		},
		false
	);
	window['AscDFH'].CChangesOFormUserEmail = CChangesOFormUserEmail;

	/**
	 * @constructor
	 * @extends {window['AscDFH'].CChangesBaseStringProperty}
	 */
	function CChangesOFormUserTelephone(Class, Old, New)
	{
		window['AscDFH'].CChangesBaseStringProperty.call(this, Class, Old, New);
	}
	window['AscDFH'].InheritPropertyChange(
		CChangesOFormUserTelephone,
		window['AscDFH'].CChangesBaseStringProperty,
		window['AscDFH'].historyitem_OForm_User_Telephone,
		function(value)
		{
			this.Class.Telephone = value;
		},
		false
	);
	window['AscDFH'].CChangesOFormUserTelephone = CChangesOFormUserTelephone;

})(window);
