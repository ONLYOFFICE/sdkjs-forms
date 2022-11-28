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
	 * Класс представляющий роль при заполнении формы. В данный момент роль - это ровно один userMaster
	 * и группа полей связанные с данным userMaster
	 * @param fieldGroup
	 * @param userMaster
	 * @constructor
	 */
	function CRole(fieldGroup, userMaster)
	{
		this.FieldGroup = fieldGroup;
		this.UserMaster = userMaster;
	}
	CRole.prototype.getSettings = function()
	{
		let r = new CRoleSettings();
		r.setName(this.UserMaster.getRole());
		r.setColor(this.UserMaster.getColor());
		return new CRoleSettings();
	};
	CRole.prototype.getRole = function()
	{
		return this.UserMaster.getRole();
	};
	CRole.prototype.getUserMaster = function()
	{
		return this.UserMaster;
	};
	CRole.prototype.getWeight = function()
	{
		return this.FieldGroup.getWeight();
	};
	CRole.prototype.setWeight = function(weight)
	{
		if (this.FieldGroup)
			this.FieldGroup.setWeight(weight);
	};
	
	/**
	 * Класс для задания настроек роли из интерфейса
	 * @constructor
	 */
	function CRoleSettings()
	{
		this.Name  = "";
		this.Color = null;
		this.Index = 0;
	}
	CRoleSettings.prototype.getName = function()
	{
		return this.Name;
	};
	CRoleSettings.prototype.setName = function(name)
	{
		this.Name = name;
	};
	CRoleSettings.prototype.setColor = function(color)
	{
		this.Color = color ? color.Copy() : null;
	};
	CRoleSettings.prototype.getColor = function()
	{
		return this.Color;
	};
	CRoleSettings.prototype.setAscColor = function(r, g, b)
	{
		if (undefined === r || null === r)
			this.Color = null;
		else
			this.Color = new AscWord.CDocumentColor(r, g, b);
	}
	CRoleSettings.prototype.getAscColor = function()
	{
		// TODO: Надо отдавать в интерфейс цвет AscColor
		return this.Color;
	};
	CRoleSettings.prototype.haveColor = function()
	{
		return (!!this.Color);
	};
	CRoleSettings.prototype.setIndex = function(index)
	{
		this.Index = index;
	};
	CRoleSettings.prototype.getIndex = function()
	{
		return this.Index;
	};
	//--------------------------------------------------------export----------------------------------------------------
	AscOForm.CRole         = CRole;
	AscOForm.CRoleSettings = CRoleSettings;
	//---------------------------------------------interface export-----------------------------------------------------
	CRole.prototype['asc_getSettings']      = CRole.prototype.getSettings;
	window['AscCommon']["CRoleSettings"]    = CRoleSettings;
	CRoleSettings.prototype["asc_getName"]  = CRoleSettings.prototype.getName;
	CRoleSettings.prototype["asc_putName"]  = CRoleSettings.prototype.setName;
	CRoleSettings.prototype["asc_getColor"] = CRoleSettings.prototype.getAscColor;
	CRoleSettings.prototype["asc_putColor"] = CRoleSettings.prototype.setAscColor;
})(window);
