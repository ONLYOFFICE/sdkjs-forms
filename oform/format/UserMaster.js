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
	let noRole = null;
	function getNoRole()
	{
		if (!noRole)
		{
			noRole = AscCommon.ExecuteNoHistory(function()
			{
				let user = new CUserMaster();
				user.setUserId("{BA186350-BB64-8503-5C55-083595AB15A9}");
				user.setRole("NoRole");
				return user;
			});
		}
		
		return noRole;
	}
	
	/**
	 * @param {boolean} [generateId=false]
	 * @constructor
	 * @extends AscOForm.CBaseFormatObject
	 */
	function CUserMaster(generateId)
	{
		AscOForm.CBaseFormatObject.call(this);
		
		this.UserId    = undefined;
		this.UserName  = undefined;
		this.UserEmail = undefined;
		this.Role      = undefined;
		this.Color     = undefined;
		
		if (true === generateId)
			this.setUserId(AscCommon.CreateGUID());
		
		this.Parent = null;
	}
	AscFormat.InitClass(CUserMaster, AscOForm.CBaseFormatObject, AscDFH.historyitem_type_OForm_UserMaster);
	CUserMaster.prototype.setParent = function(parent)
	{
		if (this.Parent === parent)
			return;
		
		this.Parent = parent;
		this.onChange();
	};
	CUserMaster.prototype.setUserId = function(userId)
	{
		if (userId === this.UserId)
			return;

		AscCommon.History.Add(new AscDFH.CChangesOFormUserMasterUserId(this, this.UserId, userId));
		this.UserId = userId;
		this.onChange();
	};
	CUserMaster.prototype.getUserId = function()
	{
		return this.UserId;
	};
	CUserMaster.prototype.setUserName = function(userName)
	{
		if (userName === this.UserName)
			return;
		
		AscCommon.History.Add(new AscDFH.CChangesOFormUserMasterUserName(this, this.UserName, userName));
		this.UserName = userName;
		this.onChange();
	};
	CUserMaster.prototype.getUserName = function()
	{
		return this.UserName;
	};
	CUserMaster.prototype.setUserEmail = function(userEmail)
	{
		if (userEmail === this.UserEmail)
			return;
		
		AscCommon.History.Add(new AscDFH.CChangesOFormUserMasterUserEmail(this, this.UserEmail, userEmail));
		this.UserEmail = userEmail;
		this.onChange();
	};
	CUserMaster.prototype.getUserEmail = function()
	{
		return this.UserEmail;
	};
	CUserMaster.prototype.setRole = function(role)
	{
		if (role === this.Role)
			return;
		
		role = null === role ? undefined : role;

		AscCommon.History.Add(new AscDFH.CChangesOFormUserMasterRole(this, this.Role, role));
		this.Role = role;
		this.onChange();
	};
	CUserMaster.prototype.getRole = function()
	{
		return this.Role ? this.Role : "";
	};
	CUserMaster.prototype.isNoRole = function()
	{
		return (this === AscOForm.getNoRole());
	};
	CUserMaster.prototype.setColor = function(r, g, b)
	{
		let newColor = undefined !== r && null !== r ? new AscWord.CDocumentColor(r, g, b) : undefined;
		let oldColor = this.Color;
		if ((!newColor && !oldColor) || (oldColor && oldColor.IsEqual(newColor)))
			return;
		
		AscCommon.History.Add(new AscDFH.CChangesOFormUserMasterColor(this, oldColor, newColor));
		this.Color = newColor;
		this.onChange();
	};
	CUserMaster.prototype.getColor = function()
	{
		return this.Color ? this.Color : null;
	};
	CUserMaster.prototype.initDefaultUser = function()
	{
		// TODO: Consider creating a unique id common for the default role
		this.setRole("Anyone");
		this.setColor(255, 239, 191);
	};
	CUserMaster.prototype.compare = function(user)
	{
		let res = AscCommon.CompareStrings(this.Role, user.Role);
		if (0 !== res)
			return res;
		
		res = AscCommon.CompareStrings(this.UserId, user.UserId);
		if (0 !== res)
			return res;
		
		if (!this.Color && !user.Color)
			return 0;
		else if (!this.Color && user.Color)
			return -1;
		else if (this.Color && !user.Color)
			return 1;
		
		
		if (this.Color.r < user.Color.r)
			return -1;
		else if (this.Color.r > user.Color.r)
			return 1;
		else if (this.Color.g < user.Color.g)
			return -1;
		else if (this.Color.g > user.Color.g)
			return 1;
		else if (this.Color.b < user.Color.b)
			return -1;
		else if (this.Color.b > user.Color.b)
			return 1;
		
		return 0;
	};
	CUserMaster.prototype.isEqual = function(user)
	{
		return (0 === this.compare(user));
	};
	CUserMaster.prototype.isDefaultUserProps = function()
	{
		let result = false;
		let u = this;
		AscCommon.ExecuteNoHistory(function()
		{
			let defaultUser = new CUserMaster();
			defaultUser.initDefaultUser();
			result = defaultUser.isEqual(u);
		});
		return result;
	};
	CUserMaster.prototype.onChange = function()
	{
		if (!this.Parent)
			return;
		
		this.Parent.onChangeUserMaster(this);
	};
	CUserMaster.prototype.toXml = function(writer)
	{
		writer.WriteXmlHeader();
		writer.WriteXmlNodeStart("user");
		writer.WriteXmlAttributesEnd();
		
		if (this.UserId)
			writer.WriteXmlNodeWithText("id", this.UserId);
		
		if (this.UserName)
			writer.WriteXmlNodeWithText("name", this.UserName);
		
		if (this.UserEmail)
			writer.WriteXmlNodeWithText("email", this.UserEmail);

		if (this.Role)
			writer.WriteXmlNodeWithText("role", this.Role);
		
		if (this.Color)
		{
			writer.WriteXmlNodeStart("color");
			writer.WriteXmlNullableAttributeStringEncode("val", this.Color.ToHexColor());
			writer.WriteXmlAttributesEnd(true);
		}
		
		writer.WriteXmlNodeEnd("user");
	};
	CUserMaster.fromXml = function(reader)
	{
		if (!reader.ReadNextNode())
			return null;
		
		let name = reader.GetNameNoNS();
		if ("user" !== reader.GetNameNoNS())
			return null;
		
		let um = new CUserMaster();
		let depth = reader.GetDepth();
		while (reader.ReadNextSiblingNode(depth))
		{
			name = reader.GetNameNoNS();
			switch(reader.GetNameNoNS())
			{
				case "id":
					um.setUserId(reader.GetTextDecodeXml());
					break;
				case "name":
					um.setUserName(reader.GetTextDecodeXml());
					break;
				case "email":
					um.setUserEmail(reader.GetTextDecodeXml());
					break;
				case "role":
					um.setRole(reader.GetTextDecodeXml());
					break;
				case "color":
					while (reader.MoveToNextAttribute())
					{
						if ("val" === reader.GetNameNoNS())
						{
							let color = new AscWord.CDocumentColor();
							color.SetFromHexColor(reader.GetValueDecodeXml());
							um.setColor(color.r, color.g, color.b);
						}
					}
					reader.ReadTillEnd();
					break;
			}
		}
		
		return um;
	};
	//--------------------------------------------------------export----------------------------------------------------
	AscOForm.CUserMaster = CUserMaster;
	AscOForm.getNoRole   = getNoRole;
	

})(window);
