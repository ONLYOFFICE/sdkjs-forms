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
	/**
	 * @param {AscOForm.CUserMaster} userMaster
	 * @constructor
	 */
	function CUser(userMaster)
	{
		AscFormat.CBaseFormatObject.call(this);

		this.Email      = null;
		this.Telephone  = null;
		this.UserMaster = userMaster;
	}
	AscFormat.InitClass(CUser, AscFormat.CBaseFormatObject, AscDFH.historyitem_type_OForm_User);
	CUser.prototype.setEmail = function(email)
	{
		if (email === this.Email)
			return;

		AscCommon.History.Add(new CChangesString(this, AscDFH.historyitem_OForm_User_Email, this.Email, email));
		this.Email = email;
	};
	CUser.prototype.setTelephone = function(telephone)
	{
		if (telephone === this.Telephone)
			return;

		AscCommon.History.Add(new CChangesString(this, AscDFH.historyitem_OForm_User_Telephone, this.Telephone, telephone));
		this.Telephone = telephone;
	};
	CUser.prototype.getUserMaster = function()
	{
		return this.UserMaster;
	};
	CUser.prototype.readChildXml = function(name, reader)
	{
		let bRead = false;
		switch (name)
		{
			case "Email":
			{
				let oNode = new CT_XmlNode();
				oNode.fromXml(reader);
				this.setEmail(oNode.text);
				bRead = true;
				break;
			}
			case "Telephone":
			{
				let oNode = new CT_XmlNode();
				oNode.fromXml(reader);
				this.setTelephone(oNode.text);
				bRead = true;
				break;
			}
		}
		return bRead;
	};
	CUser.prototype.toXml = function(writer)
	{
		writer.WriteXmlString(AscCommonWord.g_sXmlHeader);
		writer.WriteXmlNodeStart("User");
		writer.WriteXmlAttributesEnd();
		writer.WriteXmlNodeWithText("Email", this.Email);
		writer.WriteXmlNodeWithText("Telephone", this.Telephone);
		writer.WriteXmlNodeEnd("User");
	};
	//--------------------------------------------------------export----------------------------------------------------
	window['AscOForm'].CUser = CUser;

})(window);
