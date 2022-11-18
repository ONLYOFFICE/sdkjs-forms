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
	const CChangesString = AscDFH.CChangesDrawingsString;

	AscDFH.changesFactory[AscDFH.historyitem_UserMasterUserId] = CChangesString;
	AscDFH.changesFactory[AscDFH.historyitem_UserMasterRole] = CChangesString;

	AscDFH.drawingsChangesMap[AscDFH.historyitem_UserMasterUserId] = function(oClass, value) {oClass.UserId = value;};
	AscDFH.drawingsChangesMap[AscDFH.historyitem_UserMasterRole] = function(oClass, value) {oClass.Role = value;};

	/**
	 *
	 * @constructor
	 */
	function CUserMaster()
	{
		AscFormat.CBaseFormatObject.call(this);

		this.UserId = null;
		this.Role   = null;
	}
	AscFormat.InitClass(CUserMaster, AscFormat.CBaseFormatObject, AscDFH.historyitem_type_UserMaster);
	CUserMaster.prototype.setUserId = function (userId)
	{
		AscCommon.History.Add(new CChangesString(this, AscDFH.historyitem_UserMasterUserId, this.UserId, userId));
		this.UserId = userId;
	};
	CUserMaster.prototype.setRole = function (role)
	{
		if (role !== this.Role)
		{
			AscCommon.History.Add(new CChangesString(this, AscDFH.historyitem_UserMasterRole, this.Role, sRole));
			this.Role = sRole;
		}
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
	CUserMaster.prototype.writeChildren = function(writer)
	{
		let oIdNode = new CT_XmlNode();
		oIdNode.text = this.UserId;
		oIdNode.toXml(writer, "Id");

		let oRoleNode = new CT_XmlNode();
		oRoleNode.text = this.Role;
		oRoleNode.toXml(writer, "Role");
	}
	CUserMaster.prototype.toXml = function (writer)
	{
		writer.WriteXmlString(AscCommonWord.g_sXmlHeader);
		writer.WriteXmlNodeStart("UserMaster");
		writer.WriteXmlAttributesEnd();
		this.writeChildren(writer);
		writer.WriteXmlNodeEnd("UserMaster");
	};
	//--------------------------------------------------------export----------------------------------------------------
	window['AscOForm'].CUserMaster = CUserMaster;

})(window);
