/*
 * Copyright (C) Ascensio System SIA, 2009-2026
 *
 * This program is a free software product. You can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License (AGPL)
 * version 3 as published by the Free Software Foundation, together with the
 * additional terms provided in the LICENSE file.
 *
 * This program is distributed WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. For
 * details, see the GNU AGPL at: https://www.gnu.org/licenses/agpl-3.0.html
 *
 * You can contact Ascensio System SIA by email at info@onlyoffice.com
 * or by postal mail at 20A-6 Ernesta Birznieka-Upisha Street, Riga,
 * LV-1050, Latvia, European Union.
 *
 * The interactive user interfaces in modified versions of the Program
 * are required to display Appropriate Legal Notices in accordance with
 * Section 5 of the GNU AGPL version 3.
 *
 * No trademark rights are granted under this License.
 *
 * All non-code elements of the Product, including illustrations,
 * icon sets, and technical writing content, are licensed under the
 * Creative Commons Attribution-ShareAlike 4.0 International License:
 * https://creativecommons.org/licenses/by-sa/4.0/legalcode
 *
 * This license applies only to such non-code elements and does not
 * modify or replace the licensing terms applicable to the Program's
 * source code, which remains licensed under the GNU Affero General
 * Public License v3.
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

"use strict";

(function(window)
{
	/**
	 * Class representing a role when filling out a form. Currently, a role is exactly one userMaster
	 * and a field group associated with this userMaster
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
		
		if (this.UserMaster)
		{
			r.setName(this.UserMaster.getRole());
			r.setColor(this.UserMaster.getColor());
			r.setUserName(this.UserMaster.getUserName());
			r.setUserId(this.UserMaster.getUserId());
		}

		if (this.FieldGroup)
		{
			r.setFieldCount(this.FieldGroup.getAllFields().length)
			r.setFilled(this.FieldGroup.isFilled());
			r.setDate(this.FieldGroup.getDate());
		}

		return r;
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
	CRole.prototype.isFilled = function()
	{
		return this.FieldGroup ? this.FieldGroup.isFilled() : true;
	};
	CRole.prototype.setFilled = function(isFilled)
	{
		if (!this.FieldGroup || isFilled === this.FieldGroup.isFilled())
			return;
		
		this.FieldGroup.setFilled(isFilled);
		
		if (isFilled)
		{
			this.FieldGroup.setDate(Date.now());
		}
		else
		{
			this.UserMaster.setUserId(AscCommon.CreateGUID());
			this.UserMaster.setUserName(undefined);
			this.UserMaster.setUserEmail(undefined);
			this.FieldGroup.setDate(undefined);
		}
	};
	CRole.prototype.getFieldGroup = function()
	{
		return this.FieldGroup;
	};
	
	/**
	 * Class for setting role configuration from the interface
	 * @constructor
	 */
	function CRoleSettings()
	{
		this.Name       = "";
		this.Color      = null;
		this.FieldCount = 0;
		
		this.Date     = undefined;
		this.UserId   = undefined;
		this.UserName = undefined;
		this.Filled   = false;
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
	CRoleSettings.prototype.setAscColor = function(ascColor)
	{
		if (undefined === ascColor || null === ascColor)
			this.Color = null;
		else
			this.Color = new AscWord.CDocumentColor(ascColor.asc_getR(), ascColor.asc_getG(), ascColor.asc_getB());
	}
	CRoleSettings.prototype.getAscColor = function()
	{
		if (!this.Color)
			return null;
		
		return new Asc.asc_CColor(this.Color.r, this.Color.g, this.Color.b);
	};
	CRoleSettings.prototype.haveColor = function()
	{
		return (!!this.Color);
	};
	CRoleSettings.prototype.setFieldCount = function(count)
	{
		this.FieldCount = count;
	};
	CRoleSettings.prototype.getFieldCount = function()
	{
		return this.FieldCount;
	};
	CRoleSettings.prototype.getFilled = function()
	{
		return this.Filled;
	};
	CRoleSettings.prototype.setFilled = function(isFilled)
	{
		this.Filled = isFilled;
	};
	CRoleSettings.prototype.getDate = function()
	{
		return this.Date;
	};
	CRoleSettings.prototype.setDate = function(date)
	{
		this.Date = date;
	};
	CRoleSettings.prototype.getUserId = function()
	{
		return this.UserId;
	};
	CRoleSettings.prototype.setUserId = function(userId)
	{
		return this.UserId = userId
	};
	CRoleSettings.prototype.getUserName = function()
	{
		return this.UserName;
	};
	CRoleSettings.prototype.setUserName = function(userName)
	{
		this.UserName = userName;
	};
	//--------------------------------------------------------export----------------------------------------------------
	AscOForm.CRole         = CRole;
	AscOForm.CRoleSettings = CRoleSettings;
	//---------------------------------------------interface export-----------------------------------------------------
	CRole.prototype['asc_getSettings']           = CRole.prototype.getSettings;
	window['AscCommon']["CRoleSettings"]         = CRoleSettings;
	window['AscCommon'].CRoleSettings            = CRoleSettings;
	CRoleSettings.prototype["asc_getName"]       = CRoleSettings.prototype.asc_getName       = CRoleSettings.prototype.getName;
	CRoleSettings.prototype["asc_putName"]       = CRoleSettings.prototype.asc_putName       = CRoleSettings.prototype.setName;
	CRoleSettings.prototype["asc_getColor"]      = CRoleSettings.prototype.asc_getColor      = CRoleSettings.prototype.getAscColor;
	CRoleSettings.prototype["asc_putColor"]      = CRoleSettings.prototype.asc_putColor      = CRoleSettings.prototype.setAscColor;
	CRoleSettings.prototype["asc_getFieldCount"] = CRoleSettings.prototype.asc_getFieldCount = CRoleSettings.prototype.getFieldCount;
	CRoleSettings.prototype["asc_getFilled"]     = CRoleSettings.prototype.asc_getFilled     = CRoleSettings.prototype.getFilled;
	CRoleSettings.prototype["asc_getDate"]       = CRoleSettings.prototype.asc_getDate       = CRoleSettings.prototype.getDate;
	CRoleSettings.prototype["asc_getUserId"]     = CRoleSettings.prototype.asc_getUserId     = CRoleSettings.prototype.getUserId;
	CRoleSettings.prototype["asc_putUserId"]     = CRoleSettings.prototype.asc_putUserId     = CRoleSettings.prototype.setUserId;
	CRoleSettings.prototype["asc_getUserName"]   = CRoleSettings.prototype.asc_getUserName   = CRoleSettings.prototype.getUserName;
	CRoleSettings.prototype["asc_putUserName"]   = CRoleSettings.prototype.asc_putUserName   = CRoleSettings.prototype.setUserName;
})(window);
