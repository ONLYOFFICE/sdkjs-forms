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
		this.Format      = new AscOForm.CDocument(this);
		this.DefaultUser = this.Format.getDefaultUserMaster();
		this.Document    = document;
		this.CurrentUser = null;
		
		// Сейчас у нас роль - это ровно один userMaster и ровно одна группа полей
		this.Roles = [];
		this.NeedUpdateRoles = true;
	}
	/**
	 * @returns {AscWord.CDocument}
	 */
	OForm.prototype.getDocument = function()
	{
		return this.Document;
	};
	/**
	 * @returns {AscOForm.CDocument}
	 */
	OForm.prototype.getFormat = function()
	{
		return this.Format;
	};
	OForm.prototype.setCurrentRole = function(roleName)
	{
		let role = this.getRole(roleName);
		if (!role)
			return;
			
		this.CurrentUser = role.getUserMaster();
	};
	OForm.prototype.clearCurrentRole = function()
	{
		this.CurrentUser = null;
	};
	OForm.prototype.getCurrentUserMaster = function()
	{
		return this.CurrentUser;
	};
	OForm.prototype.getAllRoles = function()
	{
		this.updateRoles();
		return this.Roles;
	};
	/**
	 * @param roleSettings {AscOForm.CRoleSettings}
	 */
	OForm.prototype.addRole = function(roleSettings)
	{
		let name = "";
		if ("string" === typeof roleSettings)
		{
			name = roleSettings;
			roleSettings = new AscOForm.CRoleSettings();
			roleSettings.setName(name);
		}

		if (roleSettings instanceof AscOForm.CRoleSettings)
			name = roleSettings.getName();
		else
			return false;
		
		if (this.haveRole(name))
			return false;
		
		if (!this.startAction(AscDFH.historydescription_OForm_AddRole))
			return false;
		
		let userMaster = new AscOForm.CUserMaster(true);
		userMaster.setRole(name);
		
		let color = roleSettings.getColor();
		if (color)
			userMaster.setColor(color.r, color.g, color.b);
		
		let fieldGroup = new AscOForm.CFieldGroup();
		fieldGroup.setWeight(this.Format.getMaxWeight() + 1);
		fieldGroup.addUser(userMaster);
		
		this.Format.addFieldGroup(fieldGroup);
		this.Format.addUserMaster(userMaster);
		
		this.endAction();
		return true;
	};
	OForm.prototype.removeRole = function(name, delegateName)
	{
		this.updateRoles();
		
		let roleIndex = this.getRoleIndex(name);
		if (-1 === roleIndex)
			return false;
		
		let userMaster = this.Roles[roleIndex].getUserMaster();
		let fieldGroup = this.Roles[roleIndex].getFieldGroup();
		
		let fields = fieldGroup.getAllFields();
		
		
		let delegateIndex = this.getRoleIndex(delegateName);
		
		// На самом деле можно убрать эту проверку, но тогда мы просто удалим группу по умолчнию и заново её добавим
		if (this.Roles.length <= 1
			&& this.Roles[roleIndex].getUserMaster() === this.Format.getDefaultUserMaster()
			&& -1 === delegateIndex)
			return false;
			
		if (!this.startAction(AscDFH.historydescription_OForm_RemoveRole))
			return false;
		
		fieldGroup.clear();
		this.Format.removeFieldGroup(fieldGroup);
		this.Format.removeUserMaster(userMaster);
		
		if (fields.length > 0)
		{
			let delegateUserMaster, delegateFieldGroup;
			if (-1 === delegateIndex || delegateIndex === roleIndex)
			{
				let defaultRole = this.getDefaultRole();
				if (defaultRole)
				{
					delegateUserMaster = defaultRole.getUserMaster();
					delegateFieldGroup = defaultRole.getFieldGroup();
				}
				else
				{
					let defaultGroup = new AscOForm.CFieldGroup();
					defaultGroup.setWeight(this.Format.getMaxWeight() + 1);
					this.Format.addFieldGroup(defaultGroup);
					defaultGroup.addUser(this.Format.getDefaultUserMaster());
					
					delegateUserMaster = this.Format.getDefaultUserMaster();
					delegateFieldGroup = defaultGroup;
				}
			}
			else
			{
				delegateUserMaster = this.Roles[delegateIndex].getUserMaster();
				delegateFieldGroup = this.Roles[delegateIndex].getFieldGroup();
			}
			
			for (let index = 0, count = fields.length; index < count; ++index)
			{
				let fieldMaster = fields[index];
				fieldMaster.removeUser(userMaster);
				fieldMaster.addUser(delegateUserMaster);
			}
			
			delegateFieldGroup.addUser(delegateUserMaster);
			this.Format.addFieldGroup(delegateFieldGroup);
		}
		
		this.endAction();
		return true;
	};
	OForm.prototype.editRole = function(name, roleSettings)
	{
		let role = this.getRole(name);
		if (!role)
			return false;
		
		let newName = roleSettings.getName();
		if (undefined !== newName
			&& null !== newName
			&& name !== newName
			&& this.haveRole(newName))
			return false;
		
		if (!this.startAction(AscDFH.historyitem_OForm_EditRole))
			return false;
		
		let userMaster = role.getUserMaster();
		if (undefined !== roleSettings.getName())
			userMaster.setRole(roleSettings.getName());
		
		let color = roleSettings.getColor();
		if (null === color)
			userMaster.setColor(color);
		else if (undefined !== color)
			userMaster.setColor(color.r, color.g, color.b);
		
		this.endAction();
		return true;
	};
	OForm.prototype.moveUpRole = function(name)
	{
		let role = this.getRole(name);
		if (!role)
			return false;
		
		let weight = role.getWeight();
		let sameWeightRoles = this.getRolesByWeight(weight);
		
		if (weight === this.Format.getMinWeight() && sameWeightRoles.length <= 1)
			return false;
		
		if (!this.startAction(AscDFH.historydescription_OForm_ChangeRoleOrder))
			return false;
		
		if (sameWeightRoles.length > 1)
		{
			for (let index = 0, count = this.Roles.length; index < count; ++index)
			{
				let curRole   = this.Roles[index];
				let curWeight = curRole.getWeight();
				if (role !== curRole && curWeight >= weight)
				{
					curRole.setWeight(curWeight + 1);
				}
			}
		}
		
		let prevWeight = -1;
		for (let index = 0, count = this.Roles.length; index < count; ++index)
		{
			let curRole   = this.Roles[index];
			let curWeight = curRole.getWeight();
			if (curWeight < weight)
			{
				if (-1 === prevWeight || prevWeight < curWeight)
					prevWeight = curWeight;
			}
		}
		
		if (-1 !== prevWeight)
		{
			let prevRoles = this.getRolesByWeight(prevWeight);
			
			role.setWeight(prevWeight);
			for (let index = 0, count = prevRoles.length; index < count; ++index)
			{
				prevRoles[index].setWeight(weight);
			}
		}
		
		this.endAction();
		return true;
	};
	OForm.prototype.moveDownRole = function(name)
	{
		let role = this.getRole(name);
		if (!role)
			return false;
		
		let weight = role.getWeight();
		let sameWeightRoles = this.getRolesByWeight(weight);
		
		if (weight === this.Format.getMaxWeight() && sameWeightRoles.length <= 1)
			return false;
		
		if (!this.startAction(AscDFH.historydescription_OForm_ChangeRoleOrder))
			return false;
		
		if (sameWeightRoles.length > 1)
		{
			weight++;
			if (this.getRolesByWeight(weight + 1).length)
			{
				for (let index = 0, count = this.Roles.length; index < count; ++index)
				{
					let curRole   = this.Roles[index];
					let curWeight = curRole.getWeight();
					if (curWeight > weight)
					{
						curRole.setWeight(curWeight + 1);
					}
				}
			}
		}
		
		let nextWeight = -1;
		for (let index = 0, count = this.Roles.length; index < count; ++index)
		{
			let curRole   = this.Roles[index];
			let curWeight = curRole.getWeight();
			if (curWeight > weight)
			{
				if (-1 === nextWeight || nextWeight > curWeight)
					nextWeight = curWeight;
			}
		}
		
		if (-1 !== nextWeight)
		{
			let nextRoles = this.getRolesByWeight(nextWeight);
			
			role.setWeight(nextWeight);
			for (let index = 0, count = nextRoles.length; index < count; ++index)
			{
				nextRoles[index].setWeight(weight);
			}
		}
		else if (weight !== role.getWeight())
		{
			role.setWeight(weight);
		}
		
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
		this.updateRoles();
		
		for (let index = 0, count = this.Roles.length; index < count; ++index)
		{
			if (name === this.Roles[index].getRole())
				return index;
		}
		
		return -1;
	};
	OForm.prototype.getRolesByWeight = function(weight)
	{
		this.updateRoles();
		
		let roles = [];
		for (let index = 0, count = this.Roles.length; index < count; ++index)
		{
			if (this.Roles[index].getWeight() === weight)
				roles.push(this.Roles[index]);
		}
		
		return roles;
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
	OForm.prototype.getDefaultRole = function()
	{
		this.updateRoles();
		
		let defaultUser = this.Format.getDefaultUserMaster();
		for (let index = 0, count = this.Roles.length; index < count; ++index)
		{
			if (defaultUser === this.Roles[index].getUserMaster())
				return this.Roles[index];
		}
		
		return null;
	};
	OForm.prototype.onChangeRoles = function()
	{
		this.NeedUpdateRoles = true;
	};
	OForm.prototype.updateRoles = function()
	{
		if (!this.NeedUpdateRoles)
			return;

		this.NeedUpdateRoles = false;
		
		this.Roles = [];
		for (let fgIndex = 0, fgCount = this.Format.getFieldGroupsCount(); fgIndex < fgCount; ++fgIndex)
		{
			let fieldGroup = this.Format.getFieldGroup(fgIndex);
			let user = fieldGroup.getFirstUser();
			if (!user)
			{
				// TODO: Разобраться с такими группами
			}
			
			let haveRole = false;
			for (let roleIndex = 0, roleCount = this.Roles.length; roleIndex < roleCount; ++roleIndex)
			{
				if (this.Roles[roleIndex].getUserMaster() === user)
				{
					haveRole = true;
					break;
				}
			}
			
			if (haveRole)
			{
				// TODO: Разобраться с такими ситуациями
			}
			
			let weight       = fieldGroup.getWeight();
			let newRoleIndex = this.Roles.length;
			for (let roleIndex = 0, roleCount = this.Roles.length; roleIndex < roleCount; ++roleIndex)
			{
				let curWeight = this.Roles[roleIndex].getWeight();
				if (weight < curWeight || (weight === curWeight && user.compare(this.Roles[roleIndex].getUserMaster()) < 0))
				{
					newRoleIndex = roleIndex;
					break;
				}
			}
			
			let newRole = new AscOForm.CRole(fieldGroup, user);
			if (newRoleIndex === this.Roles.length)
				this.Roles.push(newRole);
			else
				this.Roles.splice(newRoleIndex, 0, newRole);
		}

		this.onUpdateRoles();
	};
	OForm.prototype.correctFieldGroups = function()
	{
		// Проверяем есть ли хоть одна группа с заданной ролью (где указан userMaster)
		for (let fgIndex = 0, fgCount = this.Format.getFieldGroupsCount(); fgIndex < fgCount; ++fgIndex)
		{
			let fieldGroup = this.Format.getFieldGroup(fgIndex);
			let user = fieldGroup.getFirstUser();
			if (!user)
				continue;
			
			return;
		}
		
		// Нельзя, чтобы групп не было вообще
		let defaultGroup = new AscOForm.CFieldGroup();
		defaultGroup.setWeight(this.Format.getMaxWeight() + 1);
		this.Format.addFieldGroup(defaultGroup);
		defaultGroup.addUser(this.Format.getDefaultUserMaster());
	};
	OForm.prototype.onEndLoad = function()
	{
		this.NeedUpdateRoles = true;
		this.Format.correctFieldMasters(this.getDocument());
		this.correctFieldGroups();
		this.updateRoles();
	};
	OForm.prototype.onUpdateRoles = function()
	{
		let logicDocument = this.getDocument();
		let api;
		if (!logicDocument || !(api = logicDocument.GetApi()))
			return;
		
		api.sendEvent("asc_onUpdateOFormRoles", this.Roles);
	};
	OForm.prototype.onEndAction = function()
	{
		this.Format.removeUnusedFieldMasters();
		this.Format.correctFieldMasters(this.getDocument());
		this.correctFieldGroups();
		this.updateRoles();
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
		
		this.onEndAction();
		
		logicDocument.UpdateInterface();
		logicDocument.FinalizeAction();
	};
	//--------------------------------------------------------export----------------------------------------------------
	AscOForm.OForm = OForm;
	//---------------------------------------------interface export-----------------------------------------------------
	OForm.prototype['asc_getAllRoles']  = OForm.prototype.getAllRoles;
	OForm.prototype['asc_addRole']      = OForm.prototype.addRole;
	OForm.prototype['asc_removeRole']   = OForm.prototype.removeRole;
	OForm.prototype['asc_editRole']     = OForm.prototype.editRole;
	OForm.prototype['asc_moveUpRole']   = OForm.prototype.moveUpRole;
	OForm.prototype['asc_moveDownRole'] = OForm.prototype.moveDownRole;
	OForm.prototype['asc_haveRole']     = OForm.prototype.haveRole;
	OForm.prototype['asc_getRole']      = OForm.prototype.getRoleSettings;
	
})(window);
