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
	/**
	 * @param {AscOForm.CUserMaster} userMaster
	 * @constructor
	 * @extends AscOForm.CBaseFormatObject
	 */
	function CUser(userMaster)
	{
		AscOForm.CBaseFormatObject.call(this);

		this.Email      = undefined;
		this.Telephone  = undefined;
		this.UserMaster = undefined;

		if (userMaster)
			this.setUserMaster(userMaster);
	}
	AscFormat.InitClass(CUser, AscOForm.CBaseFormatObject, AscDFH.historyitem_type_OForm_User);
	CUser.prototype.setUserMaster = function(userMaster)
	{
		if (this.UserMaster === userMaster)
			return;

		let oldValue = this.UserMaster ? this.UserMaster.GetId() : undefined;
		let newValue = userMaster ? userMaster.GetId() : undefined;

		AscCommon.History.Add(new AscDFH.CChangesOFormUserUserMaster(this, oldValue, newValue));
		this.UserMaster = userMaster;
	};
	CUser.prototype.setEmail = function(email)
	{
		if (email === this.Email)
			return;

		AscCommon.History.Add(new AscDFH.CChangesOFormUserEmail(this, this.Email, email));
		this.Email = email;
	};
	CUser.prototype.setTelephone = function(telephone)
	{
		if (telephone === this.Telephone)
			return;

		AscCommon.History.Add(new AscDFH.CChangesOFormUserTelephone(this, this.Telephone, telephone));
		this.Telephone = telephone;
	};
	CUser.prototype.getUserMaster = function()
	{
		return this.UserMaster;
	};
	CUser.prototype.toXml = function(writer)
	{
		writer.WriteXmlHeader();
		writer.WriteXmlNodeStart("user");
		writer.WriteXmlAttributesEnd();
		
		if (this.Email)
			writer.WriteXmlNodeWithText("email", this.Email);
		if (this.Telephone)
			writer.WriteXmlNodeWithText("telephone", this.Telephone);
		
		writer.WriteXmlNodeEnd("user");
	};
	CUser.fromXml = function(reader)
	{
		if (!reader.ReadNextNode())
			return null;
		
		let name = reader.GetNameNoNS();
		if ("user" !== reader.GetNameNoNS())
			return null;
		
		let user = new CUser();
		let depth = reader.GetDepth();
		while (reader.ReadNextSiblingNode(depth))
		{
			name = reader.GetNameNoNS();
			switch(reader.GetNameNoNS())
			{
				case "email":
					user.setEmail(reader.GetTextDecodeXml());
					break;
				case "telephone":
					user.setTelephone(reader.GetTextDecodeXml());
					break;
			}
		}
		
		return user;
	};
	//--------------------------------------------------------export----------------------------------------------------
	AscOForm.CUser = CUser;

})(window);
