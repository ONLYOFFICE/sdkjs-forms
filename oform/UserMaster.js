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
	const DEFAULT_COLOR = AscWord.CDocumentColor(128, 128, 128);
	
	/**
	 * @param {boolean} [generateId=false]
	 * @constructor
	 */
	function CUserMaster(generateId)
	{
		AscFormat.CBaseFormatObject.call(this);

		this.UserId = undefined;
		this.Role   = undefined;
		this.Color  = undefined;
		
		if (true === generateId)
			this.setUserId(AscCommon.CreateGUID());
	}
	AscFormat.InitClass(CUserMaster, AscFormat.CBaseFormatObject, AscDFH.historyitem_type_OForm_UserMaster);
	CUserMaster.prototype.setUserId = function(userId)
	{
		if (userId === this.UserId)
			return;

		AscCommon.History.Add(new AscDFH.CChangesOFormUserMasterUserId(this, this.UserId, userId));
		this.UserId = userId;
	};
	CUserMaster.prototype.getUserId = function()
	{
		return this.UserId;
	};
	CUserMaster.prototype.setRole = function(role)
	{
		if (role === this.Role)
			return;
		
		role = null === role ? undefined : role;

		AscCommon.History.Add(new AscDFH.CChangesOFormUserMasterRole(this, this.Role, role));
		this.Role = role;
	};
	CUserMaster.prototype.getRole = function()
	{
		return this.Role ? this.Role : "";
	};
	CUserMaster.prototype.setColor = function(r, g, b)
	{
		let newColor = undefined !== r && null !== r ? new AscWord.CDocumentColor(r, g, b) : undefined;
		let oldColor = this.Color;
		if ((!newColor && !oldColor) || (oldColor && oldColor.IsEqual(newColor)))
			return;
		
		AscCommon.History.Add(new AscDFH.CChangesOFormUserMasterColor(this, oldColor, newColor));
		this.Color = newColor;
	};
	CUserMaster.prototype.getColor = function()
	{
		if (!this.Color)
			return DEFAULT_COLOR;
		
		return this.Color;
	};
	CUserMaster.prototype.initDefaultUser = function()
	{
		// TODO: Возможно стоит придумать уникальный id общий для дефолтовой роли
		this.setRole("Anyone");
		this.setColor(128, 128, 128);
	};
	CUserMaster.prototype.compare = function(user)
	{
		if (this.Role < user.Role)
			return -1;
		else if (this.Role > user.Role)
			return 1;
		
		if (this.UserId < user.UserId)
			return -1;
		else if (this.UserId > user.UserId)
			return 1;
		
		if (!this.Color && !user.Color)
			return 0;
		else if (!this.Color && user.Color)
			return -1;
		else if (this.Color && !user.Color)
			return 1;
		
		if (color.r < otherColor.r)
			return -1;
		else if (color.r > otherColor.r)
			return 1;
		else if (color.g < otherColor.g)
			return -1;
		else if (color.g > otherColor.g)
			return 1;
		else if (color.b < otherColor.b)
			return -1;
		else if (color.b > otherColor.b)
			return 1;
		
		return 0;
	};
	CUserMaster.prototype.readChildXml = function(name, reader)
	{
		let bRead = false;
		switch (name)
		{
			case "Id":
			{
				let oNode = new CT_XmlNode();
				oNode.fromXml(reader);
				this.setUserId(oNode.text);
				bRead = true;
				break;
			}
			case "Role":
			{
				let oNode = new CT_XmlNode();
				oNode.fromXml(reader);
				this.setRole(oNode.text);
				bRead = true;
				break;
			}
		}
		return bRead;
	};
	CUserMaster.prototype.toXml = function(writer)
	{
		writer.WriteXmlString(AscCommonWord.g_sXmlHeader);
		writer.WriteXmlNodeStart("UserMaster");
		writer.WriteXmlAttributesEnd();
		writer.WriteXmlNodeWithText("Id", this.UserId);
		writer.WriteXmlNodeWithText("Role", this.Role);
		writer.WriteXmlNodeEnd("UserMaster");
	};
	//--------------------------------------------------------export----------------------------------------------------
	AscOForm.CUserMaster = CUserMaster;

})(window);
