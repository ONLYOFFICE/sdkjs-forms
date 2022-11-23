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
	 * @constructor
	 */
	function CDocument()
	{
		AscFormat.CBaseFormatObject.call(this);

		this.Author      = null;
		this.Date        = null;
		this.Description = null;
		this.Type        = null;
		this.Application = null;
		this.DocumentId  = null;
		this.FieldGroups = [];

		this.Users  = [];
		this.Fields = [];
	}
	AscFormat.InitClass(CDocument, AscFormat.CBaseFormatObject, AscDFH.historyitem_type_OForm_Document);
	CDocument.prototype.setAuthor = function(author)
	{
		if (this.Author === author)
			return;

		AscCommon.History.Add(new AscDFH.CChangesOFormDocumentAuthor(this, this.Author, author));
		this.Author = author;
	};
	CDocument.prototype.setDate = function(date)
	{
		if (this.Date === date)
			return;

		AscCommon.History.Add(new AscDFH.CChangesOFormDocumentDate(this, this.Date, date));
		this.Date = date;
	};
	CDocument.prototype.setDescription = function(description)
	{
		if (this.Description === description)
			return;

		AscCommon.History.Add(new AscDFH.CChangesOFormDocumentDescription(this, this.Description, description));
		this.Description = description;
	};
	CDocument.prototype.setType = function(type)
	{
		if (this.Type === type)
			return;
		
		AscCommon.History.Add(new AscDFH.CChangesOFormDocumentType(this, this.Type, type));
		this.Type = type;
	};
	CDocument.prototype.setApplication = function(app)
	{
		if (this.Application === app)
			return;
		
		AscCommon.History.Add(new AscDFH.CChangesOFormDocumentApplication(this, this.Application, app));
		this.Application = app;
	};
	CDocument.prototype.setDocumentId = function(documentId)
	{
		if (this.DocumentId === documentId)
			return;
		
		AscCommon.History.Add(new AscDFH.CChangesOFormDocumentDocumentId(this, this.DocumentId, documentId));
		this.DocumentId = documentId;
	};
	CDocument.prototype.addFieldGroup = function(fieldGroup)
	{
		if (-1 !== this.FieldGroups.indexOf(fieldGroup))
			return;
		
		AscCommon.History.Add(new AscDFH.CChangesOFormDocumentFieldGroup(this, fieldGroup.GetId(), true));
		this.FieldGroups.push(fieldGroup);
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
	//--------------------------------------------------------export----------------------------------------------------
	AscOForm.CDocument = CDocument;

})(window);
