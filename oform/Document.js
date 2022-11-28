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
	 * Основной класс для работы с форматом oform
	 * @param oform {AscOForm.OForm}
	 * @constructor
	 */
	function CDocument(oform)
	{
		AscFormat.CBaseFormatObject.call(this);
		
		this.OForm = oform;
		
		this.DefaultUser = new AscOForm.CUserMaster();
		this.DefaultUser.initDefaultUser();

		// Форматная часть
		this.Author      = null;
		this.Date        = null;
		this.Description = null;
		this.Type        = null;
		this.Application = null;
		this.DocumentId  = null;
		this.FieldGroups = [];

		// Массивы всех имеющихся пользователей и полей
		this.Users        = [];
		this.UserMasters  = [];
		this.FieldMasters = [];
	}
	AscFormat.InitClass(CDocument, AscFormat.CBaseFormatObject, AscDFH.historyitem_type_OForm_Document);
	CDocument.prototype.setAuthor = function(author)
	{
		if (this.Author === author)
			return;

		AscCommon.History.Add(new AscDFH.CChangesOFormDocumentAuthor(this, this.Author, author));
		this.Author = author;
	};
	CDocument.prototype.getAuthor = function()
	{
		return this.Author;
	};
	CDocument.prototype.setDate = function(date)
	{
		if (this.Date === date)
			return;

		AscCommon.History.Add(new AscDFH.CChangesOFormDocumentDate(this, this.Date, date));
		this.Date = date;
	};
	CDocument.prototype.getDate = function()
	{
		return this.Date;
	};
	CDocument.prototype.setDescription = function(description)
	{
		if (this.Description === description)
			return;

		AscCommon.History.Add(new AscDFH.CChangesOFormDocumentDescription(this, this.Description, description));
		this.Description = description;
	};
	CDocument.prototype.getDescription = function()
	{
		return this.Description;
	};
	CDocument.prototype.setType = function(type)
	{
		if (this.Type === type)
			return;
		
		AscCommon.History.Add(new AscDFH.CChangesOFormDocumentType(this, this.Type, type));
		this.Type = type;
	};
	CDocument.prototype.getType = function()
	{
		return this.Type;
	};
	CDocument.prototype.setApplication = function(app)
	{
		if (this.Application === app)
			return;
		
		AscCommon.History.Add(new AscDFH.CChangesOFormDocumentApplication(this, this.Application, app));
		this.Application = app;
	};
	CDocument.prototype.getApplication = function()
	{
		return this.Application;
	};
	CDocument.prototype.setDocumentId = function(documentId)
	{
		if (this.DocumentId === documentId)
			return;
		
		AscCommon.History.Add(new AscDFH.CChangesOFormDocumentDocumentId(this, this.DocumentId, documentId));
		this.DocumentId = documentId;
	};
	CDocument.prototype.getDocumentId = function()
	{
		return this.DocumentId;
	};
	CDocument.prototype.addFieldGroup = function(fieldGroup)
	{
		if (-1 !== this.FieldGroups.indexOf(fieldGroup))
			return;
		
		AscCommon.History.Add(new AscDFH.CChangesOFormDocumentFieldGroup(this, fieldGroup.GetId(), true));
		this.FieldGroups.push(fieldGroup);
		this.onChangeFieldGroups();
	};
	CDocument.prototype.removeFieldGroup = function(fieldGroup)
	{
		if (!fieldGroup)
			return;
		
		let index = this.FieldGroups.indexOf(fieldGroup);
		if (-1 === index)
			return;
		
		AscCommon.History.Add(new AscDFH.CChangesOFormDocumentFieldGroup(this, fieldGroup.GetId(), false));
		this.FieldGroups.splice(index, 1);
		this.onChangeFieldGroups();
	};
	CDocument.prototype.getFieldGroupsCount = function()
	{
		return this.FieldGroups.length;
	};
	CDocument.prototype.getFieldGroup = function(index)
	{
		if (index < 0 || index >= this.FieldGroups.length)
			return null;
		
		return this.FieldGroups[index];
	};
	CDocument.prototype.readChildXml = function(name, reader)
	{
		// TODO: fix me
		switch (name)
		{
			case "Author":
			{
				let oNode = new CT_XmlNode();
				oNode.fromXml(reader);
				let sAuthor = oNode.attributes["id"];
				if (sAuthor)
				{
					this.setAuthor(sAuthor);
				}
				break;
			}
			case "Date":
			{
				let oDate = new CFormDate();
				oDate.fromXml(reader);
				this.setDate(oDate);
				break;
			}
			case "Description":
			{
				
				let oNode = new CT_XmlNode();
				oNode.fromXml(reader);
				this.setDescription(oNode.text);
				break;
			}
			case "Type":
			{
				let oNode = new CT_XmlNode();
				oNode.fromXml(reader);
				this.setType(oNode.text);
				break;
			}
			case "Application":
			{
				let oNode = new CT_XmlNode();
				oNode.fromXml(reader);
				this.setApplication(oNode.text);
				break;
			}
			case "Id":
			{
				let oNode = new CT_XmlNode();
				oNode.fromXml(reader);
				this.setDocumentId(oNode.text);
				break;
			}
			case "FieldsGroup":
			{
				let oFieldsGroup = new CFieldsGroup();
				oFieldsGroup.fromXml(reader);
				this.addFieldsGroups(oFieldsGroup);
				break;
			}
		}
	};
	CDocument.prototype.toXml = function(writer)
	{
		// TODO: fix me
		writer.WriteXmlString(AscCommonWord.g_sXmlHeader);
		writer.WriteXmlNodeStart("Document");
		writer.WriteXmlAttributeString("xmlns:r", "http://schemas.openxmlformats.org/officeDocument/2006/relationships");
		writer.WriteXmlAttributesEnd();
		if (this.Author)
		{
			let oNode              = new CT_XmlNode();
			oNode.attributes["id"] = this.Author;
			oNode.toXml(writer, "Author");
		}
		if (this.Date)
		{
			this.Date.toXml(writer);
		}
		let oDescriptionNode  = new CT_XmlNode();
		oDescriptionNode.text = this.Description;
		oDescriptionNode.toXml(writer, "Description");
		
		let oTypeNode  = new CT_XmlNode();
		oTypeNode.text = this.Type;
		oTypeNode.toXml(writer, "Type");
		
		let oAppNode  = new CT_XmlNode();
		oAppNode.text = this.Application;
		oAppNode.toXml(writer, "Application");
		
		let oIdNode  = new CT_XmlNode();
		oIdNode.text = this.DocumentId;
		oIdNode.toXml(writer, "Id");
		for (let nFG = 0; nFG < this.FieldsGroups.length; ++nFG)
		{
			this.FieldsGroups[nFG].toXml(writer);
		}
		writer.WriteXmlNodeEnd("Document");
	};
	/**
	 * @returns {AscOForm.CUserMaster}
	 */
	CDocument.prototype.getDefaultUser = function()
	{
		return this.DefaultUser;
	};
	CDocument.prototype.addUser = function(user)
	{
		if (-1 !== this.Users.indexOf(user))
			return;
		
		AscCommon.History.Add(new AscDFH.CChangesOFormDocumentUser(this, user.GetId(), true));
		this.Users.push(user);
	};
	CDocument.prototype.removeUser = function(user)
	{
		let index = this.User.indexOf(user);
		if (-1 === index)
			return;
		
		AscCommon.History.Add(new AscDFH.CChangesOFormDocumentUser(this, user.GetId(), false));
		this.Users.splice(index, 1);
	};
	CDocument.prototype.getUserCount = function()
	{
		return this.Users.length;
	};
	/**
	 * @param index {number}
	 * @returns {?AscOForm.CUser}
	 */
	CDocument.prototype.getUser = function(index)
	{
		if (index < 0 || index >= this.Users.length)
			return null;
		
		return this.Users[index];
	};
	CDocument.prototype.addUserMaster = function(userMaster)
	{
		if (-1 !== this.UserMasters.indexOf(userMaster))
			return;
		
		AscCommon.History.Add(new AscDFH.CChangesOFormDocumentUserMaster(this, userMaster.GetId(), true));
		this.UserMasters.push(userMaster);
	};
	CDocument.prototype.removeUserMaster = function(userMaster)
	{
		let index = this.UserMasters.indexOf(userMaster);
		if (-1 === index)
			return;
		
		AscCommon.History.Add(new AscDFH.CChangesOFormDocumentUserMaster(this, userMaster.GetId(), false));
		this.UserMasters.splice(index, 1);
	};
	CDocument.prototype.getUserMasterCount = function()
	{
		return this.UserMasters.length;
	};
	CDocument.prototype.getUserMaster = function(index)
	{
		if (index < 0 || index >= this.UserMasters.length)
			return null;
		
		return this.UserMasters[index];
	};
	CDocument.prototype.getAllUserMasters = function()
	{
		return this.UserMasters;
	};
	CDocument.prototype.addFieldMaster = function(fieldMaster)
	{
		if (-1 !== this.FieldMasters.indexOf(fieldMaster))
			return;
		
		AscCommon.History.Add(new AscDFH.CChangesOFormDocumentFieldMaster(this, fieldMaster.GetId(), true));
		this.FieldMasters.push(fieldMaster);
	};
	CDocument.prototype.removeFieldMaster = function(fieldMaster)
	{
		let index = this.FieldMasters.indexOf(fieldMaster);
		if (-1 === index)
			return;
		
		AscCommon.History.Add(new AscDFH.CChangesOFormDocumentFieldMaster(this, fieldMaster.GetId(), false));
		this.FieldMasters.splice(index, 1);
	};
	CDocument.prototype.getFieldMasterCount = function()
	{
		return this.FieldMasters.length;
	};
	CDocument.prototype.getFieldMaster = function(index)
	{
		if (index < 0 || index >= this.FieldMasters.length)
			return null;
		
		return this.FieldMasters[index];
	};
	CDocument.prototype.getMaxWeight = function()
	{
		let max = -1;
		for (let index = 0, count = this.FieldGroups.length; index < count; ++index)
		{
			let curWeight = this.FieldGroups[index].getWeight();
			if (max < curWeight)
				max = curWeight;
		}
		
		return max;
	};
	CDocument.prototype.onChangeFieldGroups = function()
	{
		if (!this.OForm)
			return;
		
		this.OForm.onChangeRoles();
	};
	
	//--------------------------------------------------------export----------------------------------------------------
	AscOForm.CDocument = CDocument;

})(window);
