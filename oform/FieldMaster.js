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
	 * @param {boolean} [generateId=false]
	 * @constructor
	 */
	function CFieldMaster(generateId)
	{
		AscFormat.CBaseFormatObject.call(this);

		this.FieldId = null;
		this.Field   = null;
		this.Users   = [];
		this.Signers = [];
		
		if (true === generateId)
			this.setFieldId(AscCommon.CreateGUID());
	}
	AscFormat.InitClass(CFieldMaster, AscFormat.CBaseFormatObject, AscDFH.historyitem_type_OForm_FieldMaster);
	CFieldMaster.prototype.setLogicField = function(logicField)
	{
		this.Field = logicField;
	};
	CFieldMaster.prototype.clone = function()
	{
		let fm = new CFieldMaster(true);
		
		for (let index = 0, count = this.Users.length; index < count; ++index)
		{
			fm.addUser(this.Users[index]);
		}
		
		for (let index = 0, count = this.Signers.length; index < count; ++index)
		{
			fm.addSigner(this.Signers[index]);
		}
		
		return fm;
	};
	CFieldMaster.prototype.setFieldId = function(fieldId)
	{
		if (fieldId === this.FieldId)
			return;

		AscCommon.History.Add(new AscDFH.CChangesOFormFieldMasterFieldId(this, this.FieldId, fieldId));
		this.FieldId = fieldId;
	};
	CFieldMaster.prototype.getFieldId = function()
	{
		return this.FieldId;
	};
	CFieldMaster.prototype.addUser = function(user)
	{
		if (-1 !== this.Users.indexOf(user))
			return;

		AscCommon.History.Add(new AscDFH.CChangesOFormFieldMasterAddRemoveUser(this, user.GetId(), true));
		this.Users.push(user);
	};
	CFieldMaster.prototype.removeUser = function(user)
	{
		let index = this.Users.indexOf(user);
		if (-1 === index)
			return;

		AscCommon.History.Add(new AscDFH.CChangesOFormFieldMasterAddRemoveUser(this, user.GetId(), false));
		this.Users.splice(index, 1);
	};
	CFieldMaster.prototype.getUserCount = function()
	{
		return this.Users.length;
	};
	CFieldMaster.prototype.getUser = function(index)
	{
		if (index < 0 || index >= this.Users.length)
			return null;
		
		return this.Users[index];
	};
	CFieldMaster.prototype.addSigner = function(user)
	{
		if (-1 !== this.Signers.indexOf(user))
			return;

		AscCommon.History.Add(new AscDFH.CChangesOFormFieldMasterAddRemoveSigner(this, user.GetId(), true));
		this.Signers.push(user);
	};
	CFieldMaster.prototype.removeSigner = function(user)
	{
		let index = this.Signers.indexOf(user);
		if (-1 === index)
			return;

		AscCommon.History.Add(new AscDFH.CChangesOFormFieldMasterAddRemoveSigner(this, user.GetId(), false));
		this.Signers.splice(index, 1);
	};
	CFieldMaster.prototype.checkUser = function(user)
	{
		for (let index = 0, count = this.Users.length; index < count; ++index)
		{
			if (this.Users[index] === user)
				return true;
		}
		
		return false;
	};
	CFieldMaster.prototype.readAttrXml = function(name, reader)
	{
		switch (name)
		{
			case "id":
			{
				this.setFieldId(reader.GetValue());
				break;
			}
		}
	};
	CFieldMaster.prototype.readChildXml = function(name, reader)
	{
		let oThis = this;
		switch (name)
		{
			case "Users":
			{
				let oUsersNode = new CT_XmlNode(function(reader, name)
				{
					if (name === "User")
					{
						let oUserNode = new CT_XmlNode();
						oUserNode.fromXml(reader);
						let sId  = oUserNode.attributes["id"];
						let oRel = reader.rels.getRelationshipById(sId);
						reader.context.addFieldMasterRelation(oThis, oRel.targetFullName)
					}
					return true;
				});
				oUsersNode.fromXml(reader);
				break;
			}
			case "SignRequest":
			{
				let oSignRequest = new CSignRequest();
				oSignRequest.fromXml(reader);
				this.setSignRequest(oSignRequest);
				break;
			}
		}
	};
	CFieldMaster.prototype.toXml = function(writer)
	{
		writer.WriteXmlString(AscCommonWord.g_sXmlHeader);
		writer.WriteXmlNodeStart("FieldMaster");
		writer.WriteXmlAttributeString("xmlns:r", "http://schemas.openxmlformats.org/officeDocument/2006/relationships");
		writer.WriteXmlNullableAttributeString("id", this.FieldId);
		writer.WriteXmlAttributesEnd();

		writer.WriteXmlNodeStart("Users");
		writer.WriteXmlAttributesEnd();
		let oContext           = writer.context;
		let oUserMasterPartMap = oContext.userMasterPartMap;
		let oUsersIdMap        = {};
		for (let nUser = 0; nUser < this.Users.length; ++nUser)
		{
			let oUser = this.Users[nUser];
			let oPart = oUserMasterPartMap[oUser.Id];
			if (!oPart)
			{
				oPart               = writer.context.part.addPart(AscCommon.openXml.Types.userMaster);
				let oUserMemory     = new AscCommon.CMemory();
				oUserMemory.context = writer.context;
				oPart.part.setDataXml(oUser, oUserMemory);
				oUserMasterPartMap[oUser.Id] = oPart;
			}
			let oNode                = new CT_XmlNode();
			let sRId                 = oContext.part.addRelationship(AscCommon.openXml.Types.userMaster.relationType, oPart.uri);
			oNode.attributes["r:id"] = sRId
			oUsersIdMap[oUser.Id]    = sRId;
			oNode.toXml(writer, "User");
		}
		writer.WriteXmlNodeEnd("Users");
		if (this.SignRequest)
		{
			this.SignRequest.toXml(writer, oUsersIdMap);
		}
		writer.WriteXmlNodeEnd("FieldMaster");

		if (writer.context.fileType === Asc.c_oAscFileType.OFORM)
		{
			if (this.Field)
			{
				let oPart       = writer.context.docPart.part.addPartWithoutRels(AscCommon.openXml.Types.field);
				let oMemory     = new AscCommon.CMemory();
				oMemory.context = writer.context;
				oPart.setDataXml(this.Field, oMemory);
				oMemory.Seek(0);
				oPart.addRelationship(AscCommon.openXml.Types.fieldMaster.relationType, oContext.part.uri)
			}
		}
	};
	//--------------------------------------------------------export----------------------------------------------------
	AscOForm.CFieldMaster = CFieldMaster;

})(window);
