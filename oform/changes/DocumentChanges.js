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
	window['AscDFH'].historyitem_OForm_Document_Author      = window['AscDFH'].historyitem_type_OForm_Document | 1;
	window['AscDFH'].historyitem_OForm_Document_Date        = window['AscDFH'].historyitem_type_OForm_Document | 2;
	window['AscDFH'].historyitem_OForm_Document_Description = window['AscDFH'].historyitem_type_OForm_Document | 3;
	window['AscDFH'].historyitem_OForm_Document_Type        = window['AscDFH'].historyitem_type_OForm_Document | 4;
	window['AscDFH'].historyitem_OForm_Document_Application = window['AscDFH'].historyitem_type_OForm_Document | 5;
	window['AscDFH'].historyitem_OForm_Document_DocumentId  = window['AscDFH'].historyitem_type_OForm_Document | 6;
	window['AscDFH'].historyitem_OForm_Document_FieldGroup  = window['AscDFH'].historyitem_type_OForm_Document | 7;

	/**
	 * @constructor
	 * @extends {window['AscDFH'].CChangesBaseStringProperty}
	 */
	function CChangesOFormDocumentAuthor(Class, oldAuthor, newAuthor)
	{
		let oldId = oldAuthor ? oldAuthor.GetId() : undefined;
		let newId = newAuthor ? newAuthor.GetId() : undefined;
		
		window['AscDFH'].CChangesBaseStringProperty.call(this, Class, oldId, newId);
	}
	window['AscDFH'].InheritPropertyChange(
		CChangesOFormDocumentAuthor,
		window['AscDFH'].CChangesBaseStringProperty,
		window['AscDFH'].historyitem_OForm_Document_Author,
		function(value)
		{
			if (undefined === value)
			{
				this.Class.Author = undefined;
			}
			else
			{
				let author = AscCommon.g_oTableId.GetById(value);
				if (author)
					this.Class.Author = value;
			}
		},
		false
	);
	window['AscDFH'].CChangesOFormDocumentAuthor = CChangesOFormDocumentAuthor;

	/**
	 * @constructor
	 * @extends {window['AscDFH'].CChangesBaseStringProperty}
	 */
	function CChangesOFormDocumentDate(Class, Old, New)
	{
		window['AscDFH'].CChangesBaseStringProperty.call(this, Class, Old, New);
	}
	window['AscDFH'].InheritPropertyChange(
		CChangesOFormDocumentDate,
		window['AscDFH'].CChangesBaseStringProperty,
		window['AscDFH'].historyitem_OForm_Document_Date,
		function(value)
		{
			this.Class.Date = value;
		},
		false
	);
	window['AscDFH'].CChangesOFormDocumentDate = CChangesOFormDocumentDate;

	/**
	 * @constructor
	 * @extends {window['AscDFH'].CChangesBaseStringProperty}
	 */
	function CChangesOFormDocumentDescription(Class, Old, New)
	{
		window['AscDFH'].CChangesBaseStringProperty.call(this, Class, Old, New);
	}
	window['AscDFH'].InheritPropertyChange(
		CChangesOFormDocumentDescription,
		window['AscDFH'].CChangesBaseStringProperty,
		window['AscDFH'].historyitem_OForm_Document_Description,
		function(value)
		{
			this.Class.Description = value;
		},
		false
	);
	window['AscDFH'].CChangesOFormDocumentDescription = CChangesOFormDocumentDescription;

	/**
	 * @constructor
	 * @extends {window['AscDFH'].CChangesBaseStringProperty}
	 */
	function CChangesOFormDocumentType(Class, Old, New)
	{
		window['AscDFH'].CChangesBaseStringProperty.call(this, Class, Old, New);
	}
	window['AscDFH'].InheritPropertyChange(
		CChangesOFormDocumentType,
		window['AscDFH'].CChangesBaseStringProperty,
		window['AscDFH'].historyitem_OForm_Document_Type,
		function(value)
		{
			this.Class.Type = value;
		},
		false
	);
	window['AscDFH'].CChangesOFormDocumentType = CChangesOFormDocumentType;

	/**
	 * @constructor
	 * @extends {window['AscDFH'].CChangesBaseStringProperty}
	 */
	function CChangesOFormDocumentApplication(Class, Old, New)
	{
		window['AscDFH'].CChangesBaseStringProperty.call(this, Class, Old, New);
	}
	window['AscDFH'].InheritPropertyChange(
		CChangesOFormDocumentApplication,
		window['AscDFH'].CChangesBaseStringProperty,
		window['AscDFH'].historyitem_OForm_Document_Application,
		function(value)
		{
			this.Class.Application = value;
		},
		false
	);
	window['AscDFH'].CChangesOFormDocumentApplication = CChangesOFormDocumentApplication;

	/**
	 * @constructor
	 * @extends {window['AscDFH'].CChangesBaseStringProperty}
	 */
	function CChangesOFormDocumentDocumentId(Class, Old, New)
	{
		window['AscDFH'].CChangesBaseStringProperty.call(this, Class, Old, New);
	}
	window['AscDFH'].InheritPropertyChange(
		CChangesOFormDocumentDocumentId,
		window['AscDFH'].CChangesBaseStringProperty,
		window['AscDFH'].historyitem_OForm_Document_DocumentId,
		function(value)
		{
			this.Class.DocumentId = value;
		},
		false
	);
	window['AscDFH'].CChangesOFormDocumentDocumentId = CChangesOFormDocumentDocumentId;

	/**
	 * @constructor
	 * @extends {window['AscDFH'].CChangesDictionaryBase}
	 */
	function CChangesOFormDocumentFieldGroup(Class, fieldGroupId, isAdd)
	{
		window['AscDFH'].CChangesDictionaryBase.call(this, Class, fieldGroupId, isAdd);
	}
	window['AscDFH'].InheritDictionaryChange(
		CChangesOFormDocumentFieldGroup,
		window['AscDFH'].historyitem_OForm_Document_FieldGroup,
		function()
		{
			let fieldGroup = AscCommon.g_oTableId.GetById(this.Key);
			if (-1 === this.Class.FieldGroups.indexOf(fieldGroup))
				this.Class.FieldGroups.push(fieldGroup);
		},
		function()
		{
			let fieldGroup = AscCommon.g_oTableId.GetById(this.Key);
			let index      = this.Class.FieldGroups.indexOf(fieldGroup);
			if (-1 !== index)
				this.Class.FieldGroups.splice(index, 1);
		}
	);
	window['AscDFH'].CChangesOFormDocumentFieldGroup = CChangesOFormDocumentFieldGroup;

})(window);
