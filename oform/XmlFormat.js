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
	 * Класс для записи формата oform в xml и чтения oform из xml
	 * @constructor
	 */
	function CXmlFormat()
	{
		this.Main = new CXmlFile("main", "", "");
		
		this.Users        = [];
		this.UserMasters  = [];
		this.Fields       = [];
		this.FieldMasters = [];
	}
	/**
	 * Зачитываем структуру в oform-документу
	 * @param document {AscOForm.CDocument}
	 */
	CXmlFormat.prototype.toDocument = function(document)
	{
		// TODO: реализовать
	};
	/**
	 * Записываем xml-структуру по oform-документу
	 * @param document {AscOForm.CDocument}
	 */
	CXmlFormat.prototype.fromDocument = function(document)
	{
		// TODO: реализовать
	};
	/**
	 * @returns {AscOForm.CXmlFile}
	 */
	CXmlFormat.prototype.getMain = function()
	{
		return this.Main;
	};
	CXmlFormat.prototype.setMain = function(xml, relsXml)
	{
		this.Main.setXml(xml);
		this.Main.setRelsXml(relsXml);
	};
	CXmlFormat.prototype.getUserCount = function()
	{
		return this.Users.length;
	};
	/**
	 * @returns {?AscOForm.CXmlFile}
	 */
	CXmlFormat.prototype.getUser = function(index)
	{
		return this.Users[index];
	};
	CXmlFormat.prototype.addUser = function(xml, relsXml, name)
	{
		let _name = name ? name : "user" + (this.Users.length + 1);
		this.Users.push(new AscOForm.CXmlFile(xml, relsXml, _name));
	};
	CXmlFormat.prototype.getUserMasterCount = function()
	{
		return this.UserMasters.length;
	};
	/**
	 * @returns {?AscOForm.CXmlFile}
	 */
	CXmlFormat.prototype.getUserMaster = function(index)
	{
		return this.UserMasters[index];
	};
	CXmlFormat.prototype.addUserMaster = function(xml, relsXml, name)
	{
		let _name = name ? name : "userMaster" + (this.UserMasters.length + 1);
		this.UserMasters.push(new AscOForm.CXmlFile(xml, relsXml, _name));
	};
	CXmlFormat.prototype.getFieldCount = function()
	{
		return this.Fields.length;
	};
	/**
	 * @returns {?AscOForm.CXmlFile}
	 */
	CXmlFormat.prototype.getField = function(index)
	{
		return this.Fields[index];
	};
	CXmlFormat.prototype.addField = function(xml, relsXml, name)
	{
		let _name = name ? name : "field" + (this.Fields.length + 1);
		this.Fields.push(new AscOForm.CXmlFile(xml, relsXml, _name));
	};
	CXmlFormat.prototype.getFieldMasterCount = function()
	{
		return this.FieldMasters.length;
	};
	/**
	 * @returns {?AscOForm.CXmlFile}
	 */
	CXmlFormat.prototype.getFieldMaster = function(index)
	{
		return this.FieldMasters[index];
	};
	CXmlFormat.prototype.addFieldMaster = function(xml, relsXml, name)
	{
		let _name = name ? name : "fieldMaster" + (this.Fields.length + 1);
		this.Fields.push(new AscOForm.CXmlFile(xml, relsXml, _name));
	};
	//--------------------------------------------------------export----------------------------------------------------
	AscOForm.CXmlFormat = CXmlFormat;
	
})(window);
