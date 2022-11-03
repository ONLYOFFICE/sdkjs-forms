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
	const CChangesLong = AscDFH.CChangesDrawingsLong;

	AscDFH.changesFactory[AscDFH.historyitem_MainDocument_Author] = CChangesString;
	AscDFH.changesFactory[AscDFH.historyitem_MainDocument_Date] = CChangesObject;
	AscDFH.changesFactory[AscDFH.historyitem_MainDocument_Description] = CChangesString;
	AscDFH.changesFactory[AscDFH.historyitem_MainDocument_Type] = CChangesString;
	AscDFH.changesFactory[AscDFH.historyitem_MainDocument_Application] = CChangesString;
	AscDFH.changesFactory[AscDFH.historyitem_MainDocument_DocumentId] = CChangesString;
	AscDFH.changesFactory[AscDFH.historyitem_MainDocument_FieldsGroups] = CChangesContent;
	AscDFH.changesFactory[AscDFH.historyitem_MainDocument_User] = CChangesContent;
	AscDFH.changesFactory[AscDFH.historyitem_FormDate_Format] = CChangesString;
	AscDFH.changesFactory[AscDFH.historyitem_FormDate_Value] = CChangesString;
	AscDFH.changesFactory[AscDFH.historyitem_FieldsGroup_Id] = CChangesString;
	AscDFH.changesFactory[AscDFH.historyitem_FieldsGroup_Weight] = CChangesLong;
	AscDFH.changesFactory[AscDFH.historyitem_FieldsGroup_Field] = CChangesContent;

	AscDFH.drawingsChangesMap[AscDFH.historyitem_MainDocument_Author] = function (oClass, value) {oClass.Author = value;};
	AscDFH.drawingsChangesMap[AscDFH.historyitem_MainDocument_Date] = function (oClass, value) {oClass.Date = value;};
	AscDFH.drawingsChangesMap[AscDFH.historyitem_MainDocument_Description] = function (oClass, value) {oClass.Description = value;};
	AscDFH.drawingsChangesMap[AscDFH.historyitem_MainDocument_Type] = function (oClass, value) {oClass.Type = value;};
	AscDFH.drawingsChangesMap[AscDFH.historyitem_MainDocument_Application] = function (oClass, value) {oClass.Application = value;};
	AscDFH.drawingsChangesMap[AscDFH.historyitem_MainDocument_DocumentId] = function (oClass, value) {oClass.DocumentId = value;};
	AscDFH.drawingsChangesMap[AscDFH.historyitem_FormDate_Format] = function (oClass, value) {oClass.Format = value;};
	AscDFH.drawingsChangesMap[AscDFH.historyitem_FormDate_Value] = function (oClass, value) {oClass.Value = value;};
	AscDFH.drawingsChangesMap[AscDFH.historyitem_FieldsGroup_Id] = function (oClass, value) {oClass.GroupId = value;};
	AscDFH.drawingsChangesMap[AscDFH.historyitem_FieldsGroup_Weight] = function (oClass, value) {oClass.Weight = value;};

	AscDFH.drawingContentChanges[AscDFH.historyitem_MainDocument_FieldsGroups] = function (oClass) {return oClass.FieldsGroups;};
	AscDFH.drawingContentChanges[AscDFH.historyitem_MainDocument_User] = function (oClass) {return oClass.Users;};
	AscDFH.drawingContentChanges[AscDFH.historyitem_FieldsGroup_Field] = function (oClass) {return oClass.Fields;};


	function CMainDocument() {
		CBaseFormatObject.call(this);
		this.Author = null;
		this.Date = null;
		this.Description = null;
		this.Type = null;
		this.Application = null;
		this.DocumentId = null;
		this.FieldsGroups = [];

		this.Users = [];
	}
	InitClass(CMainDocument, CBaseFormatObject, AscDFH.historyitem_type_MainDocument);
	CMainDocument.prototype.setAuthor = function (sAuthor) {
		AscCommon.History.Add(new CChangesString(this, AscDFH.historyitem_MainDocument_Author, this.Author, sAuthor));
		this.Author = sAuthor;
	};
	CMainDocument.prototype.setDate = function (oDate) {
		AscCommon.History.Add(new CChangesObject(this, AscDFH.historyitem_MainDocument_Date, this.Date, oDate));
		this.Date = oDate;
	};
	CMainDocument.prototype.setDescription = function (sDescription) {
		AscCommon.History.Add(new CChangesString(this, AscDFH.historyitem_MainDocument_Description, this.Description, sDescription));
		this.Description = sDescription;
	};
	CMainDocument.prototype.setType = function (sType) {
		AscCommon.History.Add(new CChangesString(this, AscDFH.historyitem_MainDocument_Type, this.Type, sType));
		this.Type = sType;
	};
	CMainDocument.prototype.setApplication = function (sApplication) {
		AscCommon.History.Add(new CChangesString(this, AscDFH.historyitem_MainDocument_Application, this.Application, sApplication));
		this.Application = sApplication;
	};
	CMainDocument.prototype.setDocumentId = function (sDocumentId) {
		AscCommon.History.Add(new CChangesString(this, AscDFH.historyitem_MainDocument_DocumentId, this.DocumentId, sDocumentId));
		this.DocumentId = sDocumentId;
	};
	CMainDocument.prototype.addFieldsGroups = function(oFieldsGroup) {
		AscCommon.History.Add(new CChangesContent(this, AscDFH.historyitem_MainDocument_FieldsGroups, this.FieldsGroups.length, [oFieldsGroup], true));
		this.FieldsGroups.push(oFieldsGroup);
	};
	CMainDocument.prototype.addUser = function(oUser) {
		AscCommon.History.Add(new CChangesContent(this, AscDFH.historyitem_MainDocument_User, this.FieldsGroups.length, [oUser], true));
		this.Users.push(oUser);
	};
	CMainDocument.prototype.readChildXml = function (name, reader) {
		switch (name) {
			case "Author": {
				let oNode = new CT_XmlNode();
				oNode.fromXml(reader);
				let sAuthor = oNode.attributes["id"];
				if(sAuthor) {
					this.setAuthor(sAuthor);
				}
				break;
			}
			case "Date": {
				let oDate = new CFormDate();
				oDate.fromXml(reader);
				this.setDate(oDate);
				break;
			}
			case "Description": {

				let oNode = new CT_XmlNode();
				oNode.fromXml(reader);
				this.setDescription(oNode.text);
				break;
			}
			case "Type": {
				let oNode = new CT_XmlNode();
				oNode.fromXml(reader);
				this.setType(oNode.text);
				break;
			}
			case "Application": {
				let oNode = new CT_XmlNode();
				oNode.fromXml(reader);
				this.setApplication(oNode.text);
				break;
			}
			case "Id": {
				let oNode = new CT_XmlNode();
				oNode.fromXml(reader);
				this.setDocumentId(oNode.text);
				break;
			}
			case "FieldsGroup": {
				let oFieldsGroup = new CFieldsGroup();
				oFieldsGroup.fromXml(reader);
				this.addFieldsGroups(oFieldsGroup);
				break;
			}
		}
	};
	CMainDocument.prototype.toXml = function(writer) {

		writer.WriteXmlString(AscCommonWord.g_sXmlHeader);
		writer.WriteXmlNodeStart("Document");
		writer.WriteXmlAttributeString("xmlns:r", "http://schemas.openxmlformats.org/officeDocument/2006/relationships");
		writer.WriteXmlAttributesEnd();
		if(this.Author) {
			let oNode = new CT_XmlNode();
			oNode.attributes["id"] = this.Author;
			oNode.toXml(writer, "Author");
		}
		if(this.Date) {
			this.Date.toXml(writer);
		}
		let oDescriptionNode = new CT_XmlNode();
		oDescriptionNode.text = this.Description;
		oDescriptionNode.toXml(writer, "Description");

		let oTypeNode = new CT_XmlNode();
		oTypeNode.text = this.Type;
		oTypeNode.toXml(writer, "Type");

		let oAppNode = new CT_XmlNode();
		oAppNode.text = this.Application;
		oAppNode.toXml(writer, "Application");

		let oIdNode = new CT_XmlNode();
		oIdNode.text = this.DocumentId;
		oIdNode.toXml(writer, "Id");
		for(let nFG = 0; nFG < this.FieldsGroups.length; ++nFG) {
			this.FieldsGroups[nFG].toXml(writer);
		}
		writer.WriteXmlNodeEnd("Document");
	};

	function CFormDate() {
		CBaseFormatObject.call(this);
		this.Format = null;
		this.Value = null;
	}
	InitClass(CFormDate, CBaseFormatObject, AscDFH.historyitem_type_FormDate);
	CFormDate.prototype.setFormat = function(sFormat) {
		AscCommon.History.Add(new CChangesString(this, AscDFH.historyitem_FormDate_Format, this.Format, sFormat));
		this.Format = sFormat;
	};
	CFormDate.prototype.setValue = function(sValue) {
		AscCommon.History.Add(new CChangesString(this, AscDFH.historyitem_FormDate_Value, this.Value, sValue));
		this.Value = sValue;
	};
	CFormDate.prototype.readChildXml = function (name, reader) {
		switch (name) {
			case "Format": {
				let oNode = new CT_XmlNode();
				oNode.fromXml(reader);
				this.setFormat(oNode.text);
				break;
			}
			case "Value": {
				let oNode = new CT_XmlNode();
				oNode.fromXml(reader);
				this.setValue(oNode.text);
				break;
			}
		}
	};
	CFormDate.prototype.toXml = function (writer) {
		writer.WriteXmlNodeStart("Date");
		writer.WriteXmlAttributesEnd();

		let oFormatNode = new CT_XmlNode();
		oFormatNode.text = this.Format;
		oFormatNode.toXml(writer, "Format");

		let oValueNode = new CT_XmlNode();
		oValueNode.text = this.Value;
		oValueNode.toXml(writer, "Value");

		writer.WriteXmlNodeEnd("Date");
	};

	function CFieldsGroup() {
		CBaseFormatObject.call(this);
		this.GroupId = null;
		this.Weight = null;
		this.Fields = [];
	}
	InitClass(CFieldsGroup, CBaseFormatObject, AscDFH.historyitem_type_FieldsGroup);
	CFieldsGroup.prototype.setGroupId = function (sGroupId) {
		AscCommon.History.Add(new CChangesString(this, AscDFH.historyitem_FieldsGroup_Id, this.GroupId, sGroupId));
		this.GroupId = sGroupId;
	};
	CFieldsGroup.prototype.setWeight = function (nWeight) {
		AscCommon.History.Add(new CChangesLong(this, AscDFH.historyitem_FieldsGroup_Weight, this.Weight, nWeight));
		this.Weight = nWeight;
	};
	CFieldsGroup.prototype.addField = function (oField) {
		AscCommon.History.Add(new CChangesContent(this, AscDFH.historyitem_FieldsGroup_Field, this.Fields.length, [oField], true));
		this.Fields.push(oField);
	};
	CFieldsGroup.prototype.readAttrXml = function(name, reader) {
		switch (name) {
			case "id": {
				this.setGroupId(reader.GetValue());
				break;
			}
			case "weight": {
				this.setWeight(reader.GetValueInt());
				break;
			}
		}
	};
	CFieldsGroup.prototype.readChildXml = function(name, reader) {
		switch (name) {
			case "Field": {
				let oNode = new CT_XmlNode();
				oNode.fromXml(reader);
				let sId = oNode.attributes["id"];
				let oRel = reader.rels.getRelationshipById(sId);
				reader.context.addFieldGroupRelation(this, oRel.targetFullName);
				break;
			}
		}
	};
	CFieldsGroup.prototype.toXml = function (writer) {
		writer.WriteXmlNodeStart("FieldsGroup");
		writer.WriteXmlNullableAttributeString("id", this.GroupId);
		writer.WriteXmlNullableAttributeInt("weight", this.Weight);
		writer.WriteXmlAttributesEnd();

		let oContext = writer.context;
		let oFldMasterPartMap = oContext.fieldMastersPartMap;
		for(let nFldMaster = 0; nFldMaster < this.Fields.length; ++nFldMaster) {
			let oFieldMaster = this.Fields[nFldMaster];
			let oPart = oFldMasterPartMap[oFieldMaster.Id];
			if(!oPart) {
				oPart = writer.context.part.addPart(AscCommon.openXml.Types.fieldMaster);
				let oFldMemory = new AscCommon.CMemory();
				oFldMemory.context = writer.context;
				oPart.part.setDataXml(oFieldMaster, oFldMemory);
				oFldMasterPartMap[oFieldMaster.Id] = oPart;
			}
			let oNode = new CT_XmlNode();
			oNode.attributes["r:id"] = oContext.part.addRelationship(AscCommon.openXml.Types.fieldMaster.relationType, oPart.part.uri);
			oNode.toXml(writer, "Field");
		}

		writer.WriteXmlNodeEnd("FieldsGroup");
	};

	AscWord.CMainDocument = CMainDocument;
	AscWord.CFieldsGroup = CFieldsGroup;
	AscWord.CFormDate = CFormDate;
})(window);
