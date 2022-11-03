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

	AscDFH.changesFactory[AscDFH.historyitem_FormFieldMaster_FieldId] = CChangesString;
	AscDFH.changesFactory[AscDFH.historyitem_FormFieldMaster_User] = CChangesContent;
	AscDFH.changesFactory[AscDFH.historyitem_FormFieldMaster_Field] = CChangesObject;
	AscDFH.changesFactory[AscDFH.historyitem_FormFieldMaster_SignRequest] = CChangesObject;
	AscDFH.changesFactory[AscDFH.historyitem_FormField_Content] = CChangesObject;
	AscDFH.changesFactory[AscDFH.historyitem_FormField_EncryptedData] = CChangesContent;
	AscDFH.changesFactory[AscDFH.historyitem_FormField_FieldMaster] = CChangesObject;
	AscDFH.changesFactory[AscDFH.historyitem_SignRequest_User] = CChangesContent;
	AscDFH.changesFactory[AscDFH.historyitem_EncryptedData_Method] = CChangesString;
	AscDFH.changesFactory[AscDFH.historyitem_EncryptedData_Value] = CChangesString;
	AscDFH.changesFactory[AscDFH.historyitem_EncryptedData_KeyInfo] = CChangesObject;
	AscDFH.changesFactory[AscDFH.historyitem_KeyInfo_User] = CChangesString;
	AscDFH.changesFactory[AscDFH.historyitem_KeyInfo_Value] = CChangesObject;


	AscDFH.drawingsChangesMap[AscDFH.historyitem_FormFieldMaster_FieldId] = function(oClass, value) {oClass.FieldId = value;};
	AscDFH.drawingsChangesMap[AscDFH.historyitem_FormFieldMaster_Field] = function(oClass, value) {oClass.Field = value;};
	AscDFH.drawingsChangesMap[AscDFH.historyitem_FormFieldMaster_SignRequest] = function(oClass, value) {oClass.SignRequest = value;};
	AscDFH.drawingsChangesMap[AscDFH.historyitem_FormField_Content] = function(oClass, value) {oClass.FieldContent = value;};
	AscDFH.drawingsChangesMap[AscDFH.historyitem_FormField_FieldMaster] = function(oClass, value) {oClass.FieldMaster = value;};
	AscDFH.drawingsChangesMap[AscDFH.historyitem_EncryptedData_Method] = function(oClass, value) {oClass.EncryptedMethod = value;};
	AscDFH.drawingsChangesMap[AscDFH.historyitem_EncryptedData_Value] = function(oClass, value) {oClass.EncryptedValue = value;};
	AscDFH.drawingsChangesMap[AscDFH.historyitem_EncryptedData_KeyInfo] = function(oClass, value) {oClass.KeyInfo = value;};
	AscDFH.drawingsChangesMap[AscDFH.historyitem_KeyInfo_User] = function(oClass, value) {oClass.FieldId = value;};
	AscDFH.drawingsChangesMap[AscDFH.historyitem_KeyInfo_Value] = function(oClass, value) {oClass.FieldId = value;};


	AscDFH.drawingContentChanges[AscDFH.historyitem_FormFieldMaster_User] = function (oClass) {return oClass.Users;};
	AscDFH.drawingContentChanges[AscDFH.historyitem_SignRequest_User] = function (oClass) {return oClass.Users;};
	AscDFH.drawingContentChanges[AscDFH.historyitem_FormField_EncryptedData] = function (oClass) {return oClass.EndcriptedData;};


	function CFieldMaster() {
		CBaseFormatObject.call(this);
		this.FieldId = null;
		this.Users = [];
		this.Field = null;
		this.SignRequest = null;
	}
	InitClass(CFieldMaster, CBaseFormatObject, AscDFH.historyitem_type_FormFieldMaster);
	CFieldMaster.prototype.setFieldId = function(sFieldId) {
		AscCommon.History.Add(new CChangesString(this, AscDFH.historyitem_FormFieldMaster_FieldId, this.FieldId, sFieldId));
		this.FieldId = sFieldId;
	};
	CFieldMaster.prototype.addUser = function(oUser) {
		AscCommon.History.Add(new CChangesContent(this, AscDFH.historyitem_FormFieldMaster_User, this.Users.length, [oUser], true));
		this.Users.push(oUser);
	};
	CFieldMaster.prototype.setField = function(oField) {
		AscCommon.History.Add(new CChangesObject(this, AscDFH.historyitem_FormFieldMaster_Field, this.Field, oField));
		this.Field = oField;
		if(oField) {
			oField.setFieldMaster(this);
		}
	};
	CFieldMaster.prototype.setSignRequest = function(oSignRequest) {
		AscCommon.History.Add(new CChangesObject(this, AscDFH.historyitem_FormFieldMaster_SignRequest, this.SignRequest, oSignRequest));
		this.SignRequest = oSignRequest;
	};
	CFieldMaster.prototype.readAttrXml = function(name, reader) {
		switch (name) {
			case "id": {
				this.setFieldId(reader.GetValue());
				break;
			}
		}
	};
	CFieldMaster.prototype.readChildXml = function (name, reader) {
		let oThis = this;
		switch (name) {
			case "Users": {
				let oUsersNode = new CT_XmlNode(function (reader, name){
					if(name === "User") {
						let oUserNode = new CT_XmlNode();
						oUserNode.fromXml(reader);
						let sId = oUserNode.attributes["id"];
						let oRel = reader.rels.getRelationshipById(sId);
						reader.context.addFieldMasterRelation(oThis, oRel.targetFullName)
					}
					return true;
				});
				oUsersNode.fromXml(reader);
				break;
			}
			case "SignRequest": {
				let oSignRequest = new CSignRequest();
				oSignRequest.fromXml(reader);
				this.setSignRequest(oSignRequest);
				break;
			}
		}
	};
	CFieldMaster.prototype.toXml = function (writer) {
		writer.WriteXmlString(AscCommonWord.g_sXmlHeader);
		writer.WriteXmlNodeStart("FieldMaster");
		writer.WriteXmlAttributeString("xmlns:r", "http://schemas.openxmlformats.org/officeDocument/2006/relationships");
		writer.WriteXmlNullableAttributeString("id", this.FieldId);
		writer.WriteXmlAttributesEnd();

		writer.WriteXmlNodeStart("Users");
		writer.WriteXmlAttributesEnd();
		let oContext = writer.context;
		let oUserMasterPartMap = oContext.userMasterPartMap;
		let oUsersIdMap = {};
		for(let nUser = 0; nUser < this.Users.length; ++nUser) {
			let oUser = this.Users[nUser];
			let oPart = oUserMasterPartMap[oUser.Id];
			if(!oPart) {
				oPart = writer.context.part.addPart(AscCommon.openXml.Types.userMaster);
				let oUserMemory = new AscCommon.CMemory();
				oUserMemory.context = writer.context;
				oPart.part.setDataXml(oUser, oUserMemory);
				oUserMasterPartMap[oUser.Id] = oPart;
			}
			let oNode = new CT_XmlNode();
			let sRId = oContext.part.addRelationship(AscCommon.openXml.Types.userMaster.relationType, oPart.uri);
			oNode.attributes["r:id"] = sRId
			oUsersIdMap[oUser.Id] = sRId;
			oNode.toXml(writer, "User");

		}
		writer.WriteXmlNodeEnd("Users");
		if(this.SignRequest) {
			this.SignRequest.toXml(writer, oUsersIdMap);
		}
		writer.WriteXmlNodeEnd("FieldMaster");
		if(writer.context.fileType === Asc.c_oAscFileType.OFORM) {
			if(this.Field) {
				let oPart = writer.context.docPart.part.addPartWithoutRels(AscCommon.openXml.Types.field);
				let oMemory = new AscCommon.CMemory();
				oMemory.context = writer.context;
				oPart.setDataXml(this.Field, oMemory);
				oMemory.Seek(0);
				oPart.addRelationship(AscCommon.openXml.Types.fieldMaster.relationType, oContext.part.uri)
			}
		}
	};

	function CSignRequest() {
		CBaseFormatObject.call(this);
		this.Users = [];
	}
	InitClass(CSignRequest, CBaseFormatObject, AscDFH.historyitem_type_SignRequest);
	CSignRequest.prototype.addUser = function(oUser) {
		AscCommon.History.Add(new CChangesContent(this, AscDFH.historyitem_SignRequest_User, this.Users.length, [oUser], true));
		this.Users.push(oUser);
	};
	CSignRequest.prototype.readChildXml = function (name, reader) {
		CFieldMaster.prototype.readChildXml.call(this, name, reader);
	};
	CSignRequest.prototype.toXml = function (writer, oUsersIdMap) {
		writer.WriteXmlNodeStart("SignRequest");
		writer.WriteXmlAttributesEnd();

		writer.WriteXmlNodeStart("Users");
		writer.WriteXmlAttributesEnd();
		for(let nUser = 0; nUser < this.Users.length; ++nUser) {
			let oUser = this.Users[nUser];
			let oNode = new CT_XmlNode();
			let sRId = oUsersIdMap[oUser.Id];
			if(sRId) {
				oNode.attributes["r:id"] = sRId
				oUsersIdMap[oUser.Id] = sRId;
				oNode.toXml(writer, "User");
			}

		}
		writer.WriteXmlNodeEnd("Users");
		writer.WriteXmlNodeEnd("SignRequest");
	};

	function CFieldContent() {
		CParagraphContentWithParagraphLikeContent.call(this);
	}
	InitClass(CFieldContent, CParagraphContentWithParagraphLikeContent, 0);
	CFieldContent.prototype.Add_ToContent = function(Pos, Item, UpdatePosition)
	{
		AscCommon.History.Add(new CChangesFormFieldAddItem(this, Pos, [Item]));
		CParagraphContentWithParagraphLikeContent.prototype.Add_ToContent.apply(this, arguments);
	};

	CFieldContent.prototype.Remove_FromContent = function(Pos, Count, UpdatePosition)
	{
		let DeletedItems = this.Content.slice( Pos, Pos + Count );
		AscCommon.History.Add(new CChangesFormFieldRemoveItem(this, Pos, DeletedItems));
		CParagraphContentWithParagraphLikeContent.prototype.Remove_FromContent.apply(this, arguments);
	};
	CFieldContent.prototype.fromXml = function (reader) {
		CParagraphContentWithParagraphLikeContent.prototype.fromXml.call(this, reader);
	};
	CFieldContent.prototype.toXml = function (writer) {
		writer.WriteXmlNodeStart("w:sdtContent");
		writer.WriteXmlAttributesEnd();
		CParagraphContentWithParagraphLikeContent.prototype.toXml.call(this, writer);
		writer.WriteXmlNodeEnd("w:sdtContent");
	};

	function CField() {
		CBaseFormatObject.call(this);
		this.EndcriptedData = [];
		this.FieldContent = null;
	}
	InitClass(CField, CBaseFormatObject, AscDFH.historyitem_type_FormField);
	CField.prototype.setFieldContent = function(oFieldContent) {
		AscCommon.History.Add(new CChangesString(this, AscDFH.historyitem_FormField_Content, this.FieldContent, oFieldContent));
		this.FieldContent = oFieldContent;
	};
	CField.prototype.addEncryptedData = function(oEncryptedData) {
		AscCommon.History.Add(new CChangesContent(this, AscDFH.historyitem_FormField_EncryptedData, this.EndcriptedData.length, [oEncryptedData], true));
		this.EndcriptedData.push(oEncryptedData);
	};
	CField.prototype.setFieldMaster = function(oFieldMaster) {
		AscCommon.History.Add(new CChangesObject(this, AscDFH.historyitem_FormField_FieldMaster, this.FieldMaster, oFieldMaster));
		this.FieldMaster = oFieldMaster;
	};
	CField.prototype.readChildXml = function (name, reader) {
		switch (name) {
			case "EncryptedData": {
				let oEncryptedData = new CEncryptedData();
				oEncryptedData.fromXml(reader);
				this.addEncryptedData(oEncryptedData);
				break;
			}
			case "Body": {
				let oFieldContent = null;
				let oNode = new CT_XmlNode(function (reader, name) {
					if(name === "sdtContent") {
						oFieldContent = new CFieldContent();
						oFieldContent.fromXml(reader);
						return oFieldContent;
					}
					return null;
				});
				oNode.fromXml(reader);
				if(oFieldContent) {
					this.setFieldContent(oFieldContent);
				}
				break;
			}
		}
	};
	CField.prototype.toXml = function(writer) {
		writer.WriteXmlString(AscCommonWord.g_sXmlHeader);
		writer.WriteXmlNodeStart("Field");
		writer.WriteXmlAttributesEnd();
		if(this.FieldContent) {
			writer.WriteXmlNodeStart("Body");
			writer.WriteXmlString(AscCommonWord.g_sXmlDocumentNamespaces);
			writer.WriteXmlAttributesEnd();
			this.FieldContent.toXml(writer);
			writer.WriteXmlNodeEnd("Body");
		}
		for(let nData = 0; nData < this.EndcriptedData.length; ++nData) {
			this.EndcriptedData[nData].toXml(writer);
		}
		writer.WriteXmlNodeEnd("Field");
	};

	function CEncryptedData() {
		CBaseFormatObject.call(this);
		this.EncryptedMethod = null;
		this.EncryptedValue = null;
		this.KeyInfo = null;
	}
	InitClass(CEncryptedData, CBaseFormatObject, AscDFH.historyitem_type_EncryptedData);
	CEncryptedData.prototype.setEncryptedMethod = function (sEncryptedMethod) {
		AscCommon.History.Add(new CChangesString(this, AscDFH.historyitem_EncryptedData_Method, this.EncryptedMethod, sEncryptedMethod));
		this.EncryptedMethod = sEncryptedMethod;
	};
	CEncryptedData.prototype.setEncryptedValue = function (sEncryptedValue) {
		AscCommon.History.Add(new CChangesString(this, AscDFH.historyitem_EncryptedData_Value, this.EncryptedValue, sEncryptedValue));
		this.EncryptedValue = sEncryptedValue;
	};
	CEncryptedData.prototype.setKeyInfo = function (oKeyInfo) {
		AscCommon.History.Add(new CChangesObject(this, AscDFH.historyitem_EncryptedData_KeyInfo, this.KeyInfo, oKeyInfo));
		this.KeyInfo = oKeyInfo;
	};
	CEncryptedData.prototype.readChildXml = function (name, reader) {
		switch (name) {
			case "EncryptedMethod": {
				let oMethod =  new CT_XmlNode();
				oMethod.fromXml(reader);
				let sAlgorithm = oMethod.attributes["Algorithm"];
				if(sAlgorithm) {
					this.setEncryptedMethod(sAlgorithm)
				}
				break;
			}
			case "EncryptedValue": {
				let oNode = new CT_XmlNode();
				oNode.fromXml(reader);
				this.setEncryptedValue(oNode.text);
				break;
			}
			case "KeyInfo": {
				let oKeyInfo = new CKeyInfo();
				oKeyInfo.fromXml(reader);
				this.setKeyInfo(oKeyInfo)
				break;
			}
		}
	};
	CEncryptedData.prototype.toXml = function(writer) {
		writer.WriteXmlNodeStart("EncryptedData");
		writer.WriteXmlAttributesEnd();
		if(this.EncryptedMethod) {
			let oMethod =  new CT_XmlNode();
			oMethod.attributes["Algorithm"] = this.EncryptedMethod;
			oMethod.toXml(writer, "EncryptedMethod");
		}
		if(this.EncryptedValue) {
			let oValue =  new CT_XmlNode();
			oValue.text = this.EncryptedValue;
			oValue.toXml(writer, "EncryptedValue");
		}
		if(this.KeyInfo) {
			this.KeyInfo.toXml(writer);
		}
		writer.WriteXmlNodeEnd("EncryptedData");
	};

	function CKeyInfo() {
		CBaseFormatObject.call(this);
		this.UserId = null;
		this.Value = null;
	}
	InitClass(CKeyInfo, CBaseFormatObject, AscDFH.historyitem_type_KeyInfo);
	CKeyInfo.prototype.setUserId = function (sUserId) {
		AscCommon.History.Add(new CChangesString(this, AscDFH.historyitem_KeyInfo_User, this.UserId, sUserId));
		this.UserId = sUserId;
	};
	CKeyInfo.prototype.setValue = function (sValue) {
		AscCommon.History.Add(new CChangesObject(this, AscDFH.historyitem_KeyInfo_Value, this.Value, sValue));
		this.Value = sValue;
	};
	CKeyInfo.prototype.readChildXml = function (name, reader) {
		switch (name) {
			case "User": {
				let oNode =  new CT_XmlNode();
				oNode.fromXml(reader);
				this.setUserId(oNode.attributes["id"]);
				break;
			}
			case "Value": {
				let oNode =  new CT_XmlNode();
				oNode.fromXml(reader);
				this.setValue(oNode.text);
				break;
			}
		}
	};
	CKeyInfo.prototype.toXml = function(writer) {
		writer.WriteXmlNodeStart("KeyInfo");
		writer.WriteXmlAttributesEnd();
		if(this.UserId) {
			let oNode = new CT_XmlNode();
			oNode.attributes["id"] = this.UserId;
			oNode.toXml(writer, "User");
		}
		if(this.Value) {
			let oValue =  new CT_XmlNode();
			oValue.text = this.Value;
			oValue.toXml(writer, "Value");
		}
		writer.WriteXmlNodeEnd("KeyInfo");
	};

	AscWord.CFieldContent = CFieldContent;
	AscWord.CFieldMaster = CFieldMaster;
	AscWord.CField = CField;
	AscWord.CEncryptedData = CEncryptedData;
	AscWord.CKeyInfo = CKeyInfo;
	AscWord.CSignRequest = CSignRequest;
})(window);
