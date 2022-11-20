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
	window['AscDFH'].historyitem_FormFieldMaster_FieldId      = window['AscDFH'].historyitem_type_OForm_FieldMaster | 1;
	window['AscDFH'].historyitem_FormFieldMaster_AddUser      = window['AscDFH'].historyitem_type_OForm_FieldMaster | 2;
	window['AscDFH'].historyitem_FormFieldMaster_RemoveUser   = window['AscDFH'].historyitem_type_OForm_FieldMaster | 3;
	window['AscDFH'].historyitem_FormFieldMaster_AddSigner    = window['AscDFH'].historyitem_type_OForm_FieldMaster | 4;
	window['AscDFH'].historyitem_FormFieldMaster_RemoveSigner = window['AscDFH'].historyitem_type_OForm_FieldMaster | 5;


	/**
	 * Базовое изменение для работы с FieldMaster.Users и FieldMaster.Signers
	 * @constructor
	 * @extends {window['AscDFH'].CChangesBase}
	 */
	function CChangeUserBase(Class, user)
	{
		AscDFH.CChangesBase.call(this, Class);
		this.UserId = user.GetId();
	}
	CChangeUserBase.prototype = Object.create(AscDFH.CChangesBase.prototype);
	CChangeUserBase.prototype.constructor = CChangeUserBase;
	CChangeUserBase.prototype.Redo = function()
	{
	};
	CChangeUserBase.prototype.Undo = function()
	{
	};
	CChangeUserBase.prototype.WriteToBinary = function(writer)
	{
		// String : Id комментария
		writer.WriteString2(this.UserId);
	};
	CChangeUserBase.prototype.ReadFromBinary = function(reader)
	{
		// String : Id комментария
		this.UserId = reader.GetString2();
	};
	CChangeUserBase.prototype.IsNeedRecalculate = function()
	{
		return false;
	};

	function InheritUserChange(changeClass, type, redoFunction, undoFunction)
	{
		window['AscDFH'].changesFactory[type] = changeClass;

		changeClass.prototype             = Object.create(CChangeUserBase.prototype);
		changeClass.prototype.constructor = changeClass;
		changeClass.prototype.Type        = type;
		changeClass.prototype.Redo        = redoFunction;
		changeClass.prototype.Undo        = undoFunction;
	}

	/**
	 * @constructor
	 * @extends {window['AscDFH'].CChangesBaseStringProperty}
	 */
	function CChangesOFormFieldMasterFieldId(Class, Old, New)
	{
		window['AscDFH'].CChangesBaseStringProperty.call(this, Class, Old, New);
	}
	window['AscDFH'].InheritPropertyChange(
		CChangesOFormFieldMasterFieldId,
		window['AscDFH'].CChangesBaseStringProperty,
		window['AscDFH'].historyitem_FormFieldMaster_FieldId,
		function(value)
		{
			this.Class.FieldId = value;
		},
		false
	);
	window['AscDFH'].CChangesOFormFieldMasterFieldId = CChangesOFormFieldMasterFieldId;

	/**
	 * @constructor
	 * @extends {CChangeUserBase}
	 */
	function CChangesOFormFieldMasterAddUser(Class, user)
	{
		CChangeUserBase.call(this, Class, user);
	}
	InheritUserChange(
		CChangesOFormFieldMasterAddUser,
		window['AscDFH'].historyitem_FormFieldMaster_AddUser,
		function()
		{
			let user = AscCommon.g_oTableId.GetById(this.UserId);
			if (-1 === this.Class.Users.indexOf(user))
				this.Class.Users.push(user);
		},
		function()
		{
			let user  = AscCommon.g_oTableId.GetById(this.UserId);
			let index = this.Class.Users.indexOf(user);
			if (-1 !== index)
				this.Class.Users.splice(index, 1);
		}
	);
	window['AscDFH'].CChangesOFormFieldMasterAddUser = CChangesOFormFieldMasterAddUser;

	/**
	 * @constructor
	 * @extends {CChangeUserBase}
	 */
	function CChangesOFormFieldMasterRemoveUser(Class, user)
	{
		CChangeUserBase.call(this, Class, user);
	}
	InheritUserChange(
		CChangesOFormFieldMasterRemoveUser,
		window['AscDFH'].historyitem_FormFieldMaster_RemoveUser,
		function()
		{
			let user  = AscCommon.g_oTableId.GetById(this.UserId);
			let index = this.Class.Users.indexOf(user);
			if (-1 !== index)
				this.Class.Users.splice(index, 1);
		},
		function()
		{
			let user = AscCommon.g_oTableId.GetById(this.UserId);
			if (-1 === this.Class.Users.indexOf(user))
				this.Class.Users.push(user);
		}
	);
	window['AscDFH'].CChangesOFormFieldMasterRemoveUser = CChangesOFormFieldMasterRemoveUser;

	/**
	 * @constructor
	 * @extends {CChangeUserBase}
	 */
	function CChangesOFormFieldMasterAddSigner(Class, user)
	{
		CChangeUserBase.call(this, Class, user);
	}
	InheritUserChange(
		CChangesOFormFieldMasterAddSigner,
		window['AscDFH'].historyitem_FormFieldMaster_AddSigner,
		function()
		{
			let user = AscCommon.g_oTableId.GetById(this.UserId);
			if (-1 === this.Class.Signers.indexOf(user))
				this.Class.Signers.push(user);
		},
		function()
		{
			let user  = AscCommon.g_oTableId.GetById(this.UserId);
			let index = this.Class.Signers.indexOf(user);
			if (-1 !== index)
				this.Class.Signers.splice(index, 1);
		}
	);
	window['AscDFH'].CChangesOFormFieldMasterAddSigner = CChangesOFormFieldMasterAddSigner;

	/**
	 * @constructor
	 * @extends {CChangeUserBase}
	 */
	function CChangesOFormFieldMasterRemoveSigner(Class, user)
	{
		CChangeUserBase.call(this, Class, user);
	}
	InheritUserChange(
		CChangesOFormFieldMasterRemoveSigner,
		window['AscDFH'].historyitem_FormFieldMaster_RemoveSigner,
		function()
		{
			let user  = AscCommon.g_oTableId.GetById(this.UserId);
			let index = this.Class.Signers.indexOf(user);
			if (-1 !== index)
				this.Class.Signers.splice(index, 1);
		},
		function()
		{
			let user = AscCommon.g_oTableId.GetById(this.UserId);
			if (-1 === this.Class.Signers.indexOf(user))
				this.Class.Signers.push(user);
		}
	);
	window['AscDFH'].CChangesOFormFieldMasterRemoveSigner = CChangesOFormFieldMasterRemoveSigner;

})(window);
