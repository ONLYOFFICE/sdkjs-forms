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
	 * @param document {AscWord.CDocument}
	 * @constructor
	 */
	function OForm(document)
	{
		this.Format      = new AscOForm.CDocument();
		this.DefaultUser = this.Format.getDefaultUser();
		this.Document    = document;
		
		// Сейчас у нас роль - это ровно один userMaster и ровно одна группа полей
		this.Roles = [];
	}
	/**
	 * @returns {AscWord.CDocument}
	 */
	OForm.prototype.getDocument = function()
	{
		return this.LogicDocument;
	};
	/**
	 * @returns {AscOForm.CDocument}
	 */
	OForm.prototype.getFormat = function()
	{
		return this.Document;
	};
	OForm.prototype.getAllRoles = function()
	{
		return this.Roles;
	};
	/**
	 * @param roleSettings {AscOForm.CRoleSettings}
	 */
	OForm.prototype.addRole = function(roleSettings)
	{
		if (!this.startAction(AscDFH.historydescription_OForm_AddRole))
			return false;
		
		// TODO: fix me
		let role;
		if (roleSettings instanceof AscOForm.CRoleSettings)
			role = AscOForm.create(roleSettings);
		else
			role = new AscOForm.CRole();
		
		this.updateRoles();
		this.endAction();
		return true;
	};
	OForm.prototype.removeRole = function(name)
	{
		let roleIndex = this.getRoleIndex(name);
		if (-1 === roleIndex)
			return false;
			
		if (!this.startAction(AscDFH.historydescription_OForm_RemoveRole))
			return false;

		
		this.updateRoles();
		this.endAction();
		return true;
	};
	OForm.prototype.getRole = function(name)
	{
		let roleIndex = this.getRoleIndex(name);
		if (-1 === roleIndex)
			return null;
		
		return this.Roles[roleIndex];
	};
	OForm.prototype.getRoleIndex = function(name)
	{
		for (let index = 0, count = this.Roles.length; index < count; ++index)
		{
			if (name === this.Roles[index].getName())
				return index;
		}
		
		return -1;
	};
	OForm.prototype.haveRole = function(name)
	{
		return !!(this.getRole(name));
	};
	OForm.prototype.getRoleSettings = function(name)
	{
		let role = this.getRole(name);
		if (!role)
			return null;
		
		return role.getSettings();
	};
	OForm.prototype.updateRoles = function()
	{
		// TODO: Обновить состояние ролей в соответствии с форматом
		
	};
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Private area
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	OForm.prototype.startAction = function(description)
	{
		let logicDocument = this.getDocument();
		if (!logicDocument)
			return false;
		
		if (logicDocument.IsSelectionLocked(AscCommon.changestype_Document_Settings, null, false, false, null))
			return false;
		
		logicDocument.StartAction(description);
		return true;
	};
	OForm.prototype.endAction = function()
	{
		let logicDocument = this.getDocument();
		if (!logicDocument)
			return;
		
		logicDocument.UpdateInterface();
		logicDocument.FinalizeAction();
	};
	//--------------------------------------------------------export----------------------------------------------------
	AscOForm.OForm = OForm;
	//---------------------------------------------interface export-----------------------------------------------------
	OForm.prototype['asc_getAllRoles'] = OForm.prototype.getAllRoles;
	OForm.prototype['asc_addRole']     = OForm.prototype.addRole;
	OForm.prototype['asc_removeRole']  = OForm.prototype.removeRole;
	OForm.prototype['asc_haveRole']    = OForm.prototype.haveRole;
	OForm.prototype['asc_getRole']     = OForm.prototype.getRoleSettings;
	
})(window);
