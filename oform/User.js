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

(function(window, undefined) {
	const CBaseFormatObject = AscFormat.CBaseFormatObject;
	const InitClass = AscFormat.InitClass;
	const CChangesString = AscDFH.CChangesDrawingsString;
	const CChangesObject = AscDFH.CChangesDrawingsObject;
	const CChangesContent = AscDFH.CChangesDrawingsContent;

	AscDFH.changesFactory[AscDFH.historyitem_UserMasterUserId] = CChangesString;
	AscDFH.changesFactory[AscDFH.historyitem_UserMasterSignInfo] = CChangesObject;
	AscDFH.changesFactory[AscDFH.historyitem_UserMasterCipherInfo] = CChangesObject;
	AscDFH.changesFactory[AscDFH.historyitem_UserMasterRole] = CChangesString;
	AscDFH.changesFactory[AscDFH.historyitem_UserEmail] = CChangesString;
	AscDFH.changesFactory[AscDFH.historyitem_UserTelephone] = CChangesString;
	AscDFH.changesFactory[AscDFH.historyitem_UserMasterUser] = CChangesContent;

	AscDFH.drawingsChangesMap[AscDFH.historyitem_UserMasterUserId] = function(oClass, value) {oClass.UserId = value;};
	AscDFH.drawingsChangesMap[AscDFH.historyitem_UserMasterSignInfo] = function(oClass, value) {oClass.SignInfo = value;};
	AscDFH.drawingsChangesMap[AscDFH.historyitem_UserMasterCipherInfo] = function(oClass, value) {oClass.CipherInfo = value;};
	AscDFH.drawingsChangesMap[AscDFH.historyitem_UserMasterRole] = function(oClass, value) {oClass.Role = value;};
	AscDFH.drawingsChangesMap[AscDFH.historyitem_UserEmail] = function(oClass, value) {oClass.Email = value;};
	AscDFH.drawingsChangesMap[AscDFH.historyitem_UserTelephone] = function(oClass, value) {oClass.Telephone = value;};

	AscDFH.drawingContentChanges[AscDFH.historyitem_UserMasterUser] = function(oClass) {return oClass.Users;};


	function CUser()
	{
		AscFormat.CBaseFormatObject.call(this);
		this.UserMaster = null;
		this.Email = null;
		this.Telephone = null;
	}
	InitClass(CUser, AscFormat.CBaseFormatObject, AscDFH.historyitem_type_User);
	CUser.prototype.setEmail = function (sEmail) {
		AscCommon.History.Add(new CChangesString(this, AscDFH.historyitem_UserEmail, this.Email, sEmail));
		this.Email = sEmail;
	};
	CUser.prototype.setTelephone = function (sTelephone) {
		AscCommon.History.Add(new CChangesString(this, AscDFH.historyitem_UserTelephone, this.Telephone, sTelephone));
		this.Telephone = sTelephone;
	};
	CUser.prototype.readChildXml = function (name, reader) {
		if(CUserMaster.prototype.readChildXml.call(this, name, reader)) {
			return true;
		}
		let bRead = false;
		switch (name) {
			case "Email": {
				let oNode = new CT_XmlNode();
				oNode.fromXml(reader);
				this.setEmail(oNode.text);
				bRead = true;
				break;
			}
			case "Telephone": {
				let oNode = new CT_XmlNode();
				oNode.fromXml(reader);
				this.setTelephone(oNode.text);
				bRead = true;
				break;
			}
		}
		return bRead;
	};
	CUser.prototype.toXml = function (writer) {
		writer.WriteXmlString(AscCommonWord.g_sXmlHeader);
		writer.WriteXmlNodeStart("User");
		writer.WriteXmlAttributesEnd();
		let oEmailNode = new CT_XmlNode();
		oEmailNode.text = this.Email;
		oEmailNode.toXml(writer, "Email");

		let oTelephoneNode = new CT_XmlNode();
		oTelephoneNode.text = this.Telephone;
		oTelephoneNode.toXml(writer, "Telephone");
		this.writeChildren(writer);
		writer.WriteXmlNodeEnd("User");
	};

	function CSignInfo() {
		CBaseFormatObject.call(this);
		this.PublicKey = null;
		this.X509 = null;
		this.ImageValid = null;
		this.ImageInvalid = null;
	}
	InitClass(CSignInfo, CBaseFormatObject, AscDFH.historyitem_type_SignInfo);
	CSignInfo.prototype.setPublicKey = function (sPublicKey) {
		AscCommon.History.Add(new CChangesString(this, AscDFH.historyitem_SignInfo_PublicKey, this.PublicKey, sPublicKey));
		this.PublicKey = sPublicKey;
	};
	CSignInfo.prototype.setX509 = function (sX509) {
		AscCommon.History.Add(new CChangesString(this, AscDFH.historyitem_SignInfo_X509, this.X509, sX509));
		this.X509 = sX509;
	};
	CSignInfo.prototype.setImageValid = function (sImageValid) {
		AscCommon.History.Add(new CChangesString(this, AscDFH.historyitem_SignInfo_ImageValid, this.ImageValid, sImageValid));
		this.ImageValid = sImageValid;
	};
	CSignInfo.prototype.setImageInvalid = function (sImageInvalid) {
		AscCommon.History.Add(new CChangesString(this, AscDFH.historyitem_SignInfo_ImageInvalid, this.ImageInvalid, sImageInvalid));
		this.ImageInvalid = sImageInvalid;
	};
	CSignInfo.prototype.readChildXml = function (name, reader) {
		switch (name) {
			case "PublicKey": {
				let oNode = new CT_XmlNode();
				oNode.fromXml(reader);
				this.setPublicKey(oNode.text);
				break;
			}
			case "X509": {
				let oNode = new CT_XmlNode();
				oNode.fromXml(reader);
				this.setX509(oNode.text);
				break;
			}
			case "ImageValid": {
				let oNode = new CT_XmlNode();
				oNode.fromXml(reader);
				this.setImageValid(oNode.text);
				break;
			}
			case "ImageInvalid": {
				let oNode = new CT_XmlNode();
				oNode.fromXml(reader);
				this.setImageInvalid(oNode.text);
				break;
			}
		}
	};
	CSignInfo.prototype.toXml = function(writer) {
		writer.WriteXmlNodeStart("SignInfo");
		writer.WriteXmlAttributesEnd();
		let oPublicKeyNode = new CT_XmlNode();
		oPublicKeyNode.text = this.PublicKey;
		oPublicKeyNode.toXml(writer, "PublicKey");

		let oX509Node = new CT_XmlNode();
		oX509Node.text = this.X509;
		oX509Node.toXml(writer, "X509");

		let oImageValidNode = new CT_XmlNode();
		oImageValidNode.text = this.ImageValid;
		oImageValidNode.toXml(writer, "ImageValid");

		let oImageInvalidNode = new CT_XmlNode();
		oImageInvalidNode.text = this.ImageInvalid;
		oImageInvalidNode.toXml(writer, "ImageInvalid");

		writer.WriteXmlNodeEnd("SignInfo");
	};

	function CCipherInfo() {
		CBaseFormatObject.call(this);
		this.PublicKey = null;
	}
	InitClass(CCipherInfo, CBaseFormatObject, AscDFH.historyitem_type_CipherInfo);
	CCipherInfo.prototype.setPublicKey = function (sPublicKey) {
		AscCommon.History.Add(new CChangesString(this, AscDFH.historyitem_CipherInfo_PublicKey, this.PublicKey, sPublicKey));
		this.PublicKey = sPublicKey;
	};
	CCipherInfo.prototype.readChildXml = function (name, reader) {
		switch (name) {
			case "PublicKey": {
				let oNode = new CT_XmlNode();
				oNode.fromXml(reader);
				this.setPublicKey(oNode.text);
				break;
			}
		}
	};
	CCipherInfo.prototype.toXml = function(writer) {
		writer.WriteXmlNodeStart("CipherInfo");
		writer.WriteXmlAttributesEnd();
		let oPublicKeyNode = new CT_XmlNode();
		oPublicKeyNode.text = this.PublicKey;
		oPublicKeyNode.toXml(writer, "PublicKey");
		writer.WriteXmlNodeEnd("CipherInfo");
	};

	AscWord.CUser = CUser;
	AscWord.CSignInfo = CSignInfo;
	AscWord.CCipherInfo = CCipherInfo;
})(window);
