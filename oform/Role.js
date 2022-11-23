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
	CRole.create = function(name, weight)
	{
		let userMaster = new AscOForm.CUserMaster(true);
		userMaster.setRole(name);
		
		let fieldGroup = new AscOForm.CFieldGroup();
		fieldGroup.setWeight(weight);
		
		return new CRole(fieldGroup, userMaster);
	};
	CRole.prototype.getSettings = function()
	{
		// TODO: Fix me
		return new CRoleSettings();
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
	CRoleSettings.prototype.setColor = function(r, g, b)
	{
		this.Color = new AscWord.CDocumentColor(r, g, b);
	};
	CRoleSettings.prototype.getColor = function()
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
	AscOForm.CRole = CRole;
	AscOForm.CRoleSettings = CRoleSettings;
	//---------------------------------------------interface export-----------------------------------------------------
	window['AscCommon']["CRoleSettings"] = CRoleSettings;
	
})(window);
