<?xml version="1.0" encoding="UTF-8"?>
<!--
Copyright (c) 2003 CGI Information Systems & Management Consultants Inc.


Revision History:
20040909 inz	Add display of XREF licence number if exists
20040826 inz  Fix missing display of Description for convictions for PE
20040823 tamf	Break Reference and Comment into two lines
20040820 inz	make "Address:" label displayed regardless of existence of <Address> element
20040820 tamf	Correct Postal Code, should start from 4 for last three character
				Use Date for Accident
20040715 tamf	check the count of ConvictionDate >0 instead of =1
20040713 tamf	
20040628 tamf	adjust column width to align the content.  Move the Request Licence to the top
20040527 inz	change display format of all date elements from yyyy-mm-dd to dd/mm/yyyy
20040510 petersonb
20040415 inz
20040331 inz
20040112 inz
20030730 inz	completed for other provinces
20030601 inz	created - Ontario MVRs only
20040710 kauffmanj
                [CENSUS-234] PEI - added "DemeritPoints" field
                                   added placeholder spaces for "RSPEICode" or "Status" if they are empty 
                             ALL - escaped all multiple blank spaces to fix error in text "PARTICULARS..."
                                   and prevent accidental deletions of placeholder spaces
				[CENSUS-321] NS  - fixed "Description" field for accidents																					
                             ALL - added comma after last name in "Name" field, except ON & NS
                [CENSUS-304] ALL - added "Name" field for error reports
                                   removed space between name and reference
                                   added TDs to correct display problem for "Reference" and "Comment" fields
                [CENSUS-345] ALL - originated as NS issue, added word-wrap attribute to <td> containing 
                                   "Description" field to break long lines
                                   added space after each reinstatement
                             NS  - added display of "Licence Issue Date" field
                [CENSUS-340] ALL - added tags to hide abstract summaries
                [CENSUS-357] ALL EXCEPT QUE, AB.                              
                                 - added space between data and description for long lines
                [CENSUS-303] ALL - added space between ReplyDt, BirDt, & ExpDt
20041213 kauffmanj
                added back section of code that was removed accidentally during earlier editing,
                from comment "Header - Title and Number of Conviction" to comment "End Header"
20041215 kauffmanj
                [CENSUS-439] NS  - changed NS "Issue Date:" label to "First Licensed On:"
                [CENSUS-464] NB  - added display of 'Name' field and "ACCIDENT" text                                  
20050923 lob
                [CENSUS-655] NS  - Add to NS Licenced label to "First Licensed On:" as a Comment 
20051220 suny   [Census-806] NS  - combine endrosment with class for NS.  
20060507 suny   [Census-1034] NS - add FirstLicencedComment
20070124 ST     [Census-1252]    - modify <h3> for IE7
20080509 ST     [Census-1663]    - added NS "Offence Date:"
20080510 ST     [Census-1582]    - added NL "Susp Description:"
20090615 YS     [Census-1922]    - RW implementation of one (ING) MVR style sheet
20151102  PS  - TFS 12457  Alberta restricted driver comment  is now added to the First Licenced comment.   Changed display of Suspended Yes to Yes (Restricted) if this exist
20151214 ST   - TFS 12694  Changed display of Yes (Restricted) to DRIVER HAS A RESTRICTED LICENCE 
20151210 PS                   PE - New fields has been added in response so modified style sheet to disply on report
20160425 MuruganA Added condition to display the printline for respectvie Request id for QUEBEC


Description
===========
Stylesheet for rendering an MVR on a web page.  XML Schema for the MVR can be found at 
http://localhost/IISDOTNETAPP/XMLSchemas/MVRAbstract.xsd.

-->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

  <xsl:template match="/">
    <xsl:apply-templates select="//MVRAbstract" />
    <!-- HIDES ABSTRACT SUMMARIES.  DO NOT REMOVE. -->
    <xsl:apply-templates select="//MVRAbstractSummary" />
  </xsl:template>


  <xsl:template match="MVRAbstractSummary">
  </xsl:template>


  <xsl:template match="MVRAbstract">

    <xsl:variable name="myProvince" select="@province"/>
    <xsl:variable name="myRequestId" select="RequestId"/>
    <xsl:variable name="requestDriverLicenceNumber" select="RequestInfo/DriverLicenceNumber"/>
    <xsl:variable name="ExternalUsed" >
      <xsl:if test="count(//MVRResponseDT)>0">
        <xsl:text>YES</xsl:text>
      </xsl:if  >
    </xsl:variable>

    <xsl:variable name="RequestorName" >
      <xsl:if test="count(//MVRResponseDT)>0">
        <xsl:value-of select="//MVRResponseDT/UserLastName"/>
        <xsl:if test="count(//MVRResponseDT/UserLastName)>0">
          <xsl:text>, </xsl:text>
        </xsl:if>
        <xsl:value-of select="//MVRResponseDT/UserFirstName"/>
      </xsl:if>
    </xsl:variable>

    <xsl:variable name="RequestorUserName">
      <xsl:if test="count(//MVRResponseDT)>0">
        <xsl:value-of select="//MVRResponseDT/Username"/>
      </xsl:if  >
    </xsl:variable>

    <xsl:variable name="RequestDate">
      <xsl:if test="count(//MVRResponseDT)>0">
        <xsl:call-template name="display-date">
          <xsl:with-param name="pDate" select="substring(//MVRResponseDT/ReceivedDateTime,1,10)"/>
        </xsl:call-template>
      </xsl:if  >
    </xsl:variable>

    <xsl:variable name="ReplyDate">
      <xsl:if test="count(//MVRResponseDT)>0">
        <xsl:call-template name="display-date">
          <xsl:with-param name="pDate" select="substring(//MVRResponseDT/ProviderResponseDateTime,1,10)"/>
        </xsl:call-template>
      </xsl:if  >
    </xsl:variable>

    <xsl:variable name="PrintDate">
      <xsl:if test="count(//MVRResponseDT)>0">
        <xsl:choose>
          <xsl:when test="count(//MVRResponseDT/ResponseSentDateTime)>0">
            <xsl:call-template name="display-date">
              <xsl:with-param name="pDate" select="substring(//MVRResponseDT/ResponseSentDateTime,1,10)"/>
            </xsl:call-template>
          </xsl:when>
          <xsl:otherwise>
            <xsl:call-template name="display-date">
              <xsl:with-param name="pDate" select="substring(//MVRResponseDT/ProviderResponseDateTime,1,10)"/>
            </xsl:call-template>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:if  >
    </xsl:variable>

    <xsl:variable name="ReprintDate">
      <xsl:if test="count(//MVRResponseDT)>0">
        <xsl:call-template name="display-date">
          <xsl:with-param name="pDate" select="substring(//MVRResponseDT/ReprintDateTime,1,10)"/>
        </xsl:call-template>
      </xsl:if  >
    </xsl:variable>

    <xsl:variable name="RequestReference">
      <xsl:if test="count(//MVRRequestDT)>0">
        <xsl:value-of select="//MVRRequestDT/RequestReference"/>
      </xsl:if  >
    </xsl:variable>

    <xsl:variable name="RequestComment">
      <xsl:if test="count(//MVRRequestDT)>0">
        <xsl:value-of select="//MVRRequestDT/RequestComment"/>
      </xsl:if  >
    </xsl:variable>

    <html xml:lang="en" lang="en">
      <head>
        <xsl:choose>
          <xsl:when test='contains($ExternalUsed,"YES")'>
            <LINK href="../includes/mvrabstract.css" type="text/css" rel="stylesheet" />
          </xsl:when>
          <xsl:otherwise>
            <LINK href="../includes/mvrabstract.css" type="text/css" rel="stylesheet" />
          </xsl:otherwise>
        </xsl:choose>
        <title>MVR Data</title>
      </head>
      <body>
        <table style="border:1px solid #b22222;" cellPadding="7" cellspacing="0" width="100%" class="reporttable">
          <tr>
            <td style="border:1px solid #b22222;">
              <!--Header - Title and Number of Conviction-->
              <div class="abLabel" align="center">
                <p>
                  <xsl:choose>
                    <xsl:when test='contains($myProvince,"ON")'>
                      <xsl:text>ONTARIO</xsl:text>
                    </xsl:when>
                    <xsl:when test='contains($myProvince,"QC")'>
                      <xsl:text>QUEBEC</xsl:text>
                    </xsl:when>
                    <xsl:when test='contains($myProvince,"AB")'>
                      <xsl:text>ALBERTA</xsl:text>
                    </xsl:when>
                    <xsl:when test='contains($myProvince,"NB")'>
                      <xsl:text>NEW BRUNSWICK</xsl:text>
                    </xsl:when>
                    <xsl:when test='contains($myProvince,"NS")'>
                      <xsl:text>NOVA SCOTIA</xsl:text>
                    </xsl:when>
                    <xsl:when test='contains($myProvince,"NL")'>
                      <xsl:text>NEWFOUNDLAND</xsl:text>
                    </xsl:when>
                    <xsl:when test='contains($myProvince,"PE")'>
                      <xsl:text>PRINCE EDWARD ISLAND</xsl:text>
                    </xsl:when>
                    <xsl:otherwise>
                      <xsl:text>UNKNOWN</xsl:text>
                    </xsl:otherwise>
                  </xsl:choose>
                  <xsl:choose>
                    <xsl:when test='count(ProviderError)=0'>
                      <xsl:text> Driving Record</xsl:text>
                    </xsl:when>
                    <xsl:otherwise>
                      <xsl:text> ERROR REPORT</xsl:text>
                    </xsl:otherwise>
                  </xsl:choose>
                </p>
                <xsl:if test='not(contains($myProvince,"QC")) and count(ProviderError)=0'>
                  <p>
                    <span class="absubHeading">***Number of Convictions: </span>
                    <span class="abText">
                      <xsl:value-of select="count(Conviction)"/>
                    </span>
                    <span class="absubHeading">***</span>
                  </p>
                </xsl:if>
                <!-- End not(contains($myProvince,"QC")) and count(ProviderError)=0 -->
              </div>
              <!--End Header-->
              <br/>
              <xsl:if test='not(contains($myProvince,"QC"))'>
                <!--Show Driver's Info-->
                <xsl:for-each select="DriverInfo">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" class="reporttable1">
                    <col width="19%" valign="top"/>
                    <col width="38%"/>
                    <col width="18%" valign="top"/>
                    <col width="25%"/>
                    <tbody>
                      <tr>
                        <td class="abLabel">Licence Number:</td>
                        <td class="abText">
                          <xsl:choose>
                            <xsl:when test='contains($myProvince,"ON")'>
                              <xsl:value-of select="concat(substring(LicenceNumber,1,5),'-',substring(LicenceNumber,6,5),'-',substring(LicenceNumber,11,5))"/>
                            </xsl:when>
                            <!-- ON -->
                            <xsl:otherwise>
                              <xsl:value-of select="LicenceNumber"/>
                            </xsl:otherwise>
                          </xsl:choose>
                        </td>
                        <td class="abLabel">Expiry Date:</td>
                        <td class="abText">
                          <xsl:call-template name="display-date">
                            <xsl:with-param name="pDate" select="LicenceExpiryDate"/>
                          </xsl:call-template>
                        </td>
                      </tr>
                      <xsl:if test='string-length($requestDriverLicenceNumber)>0 and not(contains($requestDriverLicenceNumber,LicenceNumber))'>
                        <tr>
                          <td class="abLabel">XREF From:</td>
                          <td class="abText">
                            <xsl:choose>
                              <xsl:when test='contains($myProvince,"ON")'>
                                <xsl:value-of select="concat(substring($requestDriverLicenceNumber,1,5),'-',substring($requestDriverLicenceNumber,6,5),'-',substring($requestDriverLicenceNumber,11,5))"/>
                              </xsl:when>
                              <!-- ON -->
                              <xsl:otherwise>
                                <xsl:value-of select="$requestDriverLicenceNumber"/>
                              </xsl:otherwise>
                            </xsl:choose>
                          </td>
                        </tr>
                      </xsl:if>
                      <tr>
                        <td class="abLabel">Name:</td>
                        <td class="abText">
                          <xsl:choose>
                            <xsl:when test='contains($myProvince,"ON") or contains($myProvince,"NS") or contains($myProvince,"NB")'>
                              <xsl:value-of select="substring(Name,1,30)"/>
                            </xsl:when>
                            <xsl:otherwise>
                              <xsl:choose>
                                <xsl:when test='contains(Name," ")'>
                                  <xsl:value-of select="concat(substring-before(Name, ' '), ', ', substring-after(Name, ' '))"/>
                                </xsl:when>
                                <xsl:otherwise>
                                  <xsl:value-of select="substring(Name,1,30)"/>
                                </xsl:otherwise>
                              </xsl:choose>
                            </xsl:otherwise>
                          </xsl:choose>
                        </td>
                        <td class="abLabel">Birth Date:</td>
                        <td class="abText">
                          <xsl:call-template name="display-date">
                            <xsl:with-param name="pDate" select="BirthDate"/>
                          </xsl:call-template>
                        </td>
                      </tr>
                      <xsl:if test='contains($myProvince,"ON") or contains($myProvince,"AB")'>
                        <tr>
                          <td class="abLabel">Gender:</td>
                          <td class="abText">
                            <xsl:value-of select="Gender"/>
                          </td>
                          <td class="abLabel">Height:</td>
                          <td class="abText">
                            <xsl:value-of select="Height"/>
                            <xsl:text> CM</xsl:text>
                          </td>
                        </tr>
                      </xsl:if>
                      <!-- ON, AB -->
                      <tr valign="top">
                        <td class="abLabel">Address:</td>
                        <td class="abText">
                          <xsl:for-each select="Address">
                            <xsl:choose>
                              <xsl:when test='contains($myProvince,"ON")'>
                                <xsl:value-of select="Street"/>
                                <br/>
                                <xsl:value-of select="Municipality"/>
                                <xsl:text>, </xsl:text>
                                <xsl:value-of select="Province"/>
                                <br/>
                              </xsl:when>
                              <!-- ON -->
                              <xsl:otherwise>
                                <xsl:for-each select="AddressLine">
                                  <xsl:value-of select="text()"/>
                                  <br/>
                                </xsl:for-each>
                              </xsl:otherwise>
                              <!-- Not ON -->
                            </xsl:choose>
                            <xsl:choose>
                              <xsl:when test='string-length(PostalCode)=6'>
                                <xsl:value-of select="concat(substring(PostalCode,1,3),' ',substring(PostalCode,4,3))"/>
                              </xsl:when>
                              <xsl:otherwise>
                                <xsl:value-of select="PostalCode"/>
                              </xsl:otherwise>
                            </xsl:choose>
                          </xsl:for-each>
                          <!-- End Each Address -->
                        </td>
                        <xsl:if test='contains($myProvince,"AB")'>
                          <td class="abLabel">Weight:</td>
                          <td class="abText">
                            <xsl:value-of select="Weight"/>
                            <xsl:text> KG</xsl:text>
                          </td>
                        </xsl:if>
                        <!-- AB -->
                      </tr>
                    </tbody>
                  </table>
                </xsl:for-each>
                <!-- End Each Driver Info -->
                <!--End Driver Info-->

                <!--Show Request Licence Number-->
                <xsl:if test='count(ProviderError)>0'>
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" class="reporttable1">
                    <col width="19%" valign="top"/>
                    <col width="38%"/>
                    <col width="18%" valign="top"/>
                    <col width="25%"/>
                    <tbody>
                      <tr>
                        <td class="abLabel">Licence Number:</td>
                        <td class="abText">
                          <xsl:choose>
                            <xsl:when test='contains($myProvince,"ON")'>
                              <xsl:value-of select="concat(substring(RequestInfo/DriverLicenceNumber,1,5),'-',substring(RequestInfo/DriverLicenceNumber,6,5),'-',substring(RequestInfo/DriverLicenceNumber,11,5))"/>
                            </xsl:when>
                            <xsl:otherwise>
                              <xsl:value-of select="RequestInfo/DriverLicenceNumber"/>
                            </xsl:otherwise>
                          </xsl:choose>
                        </td>
                        <td class="abLabel">Birth Date: </td>
                        <td class="abText">
                          <!--<xsl:value-of select="RequestInfo/BirthDate"/>-->
                          <xsl:call-template name="display-date">
                            <xsl:with-param name="pDate" select="RequestInfo/BirthDate"/>
                          </xsl:call-template>
                        </td>
                      </tr>
                      <tr>
                        <td class="abLabel">Name:</td>
                        <td class="abText">
                          <xsl:value-of select="Name"/>
                        </td>
                        <td></td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </xsl:if>
                <!-- End count(ProviderError)>0 -->
                <!--End Show Request Licence-->

                <!--Reference and Comment-->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" class="reporttable1">
                  <col width="19%" valign="top"/>
                  <col width="38%"/>
                  <!--col width="18%" valign="top"/>
					<col width="25%"/-->
                  <tbody>
                    <tr>
                      <td class="abLabel">Reference:</td>
                      <td class="abText">
                        <xsl:choose>
                          <xsl:when test='string(RequestReference)'>
                            <xsl:value-of select="RequestReference"/>
                          </xsl:when>
                          <xsl:otherwise>
                            <xsl:value-of select="$RequestReference"/>
                          </xsl:otherwise>
                        </xsl:choose>
                      </td>
                      <td>
                        <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
                      </td>
                      <td>
                        <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
                      </td>
                    </tr>
                    <tr>
                      <td class="abLabel">Comment:</td>
                      <td class="abText">
                        <xsl:choose>
                          <xsl:when test='string(RequestComment)'>
                            <xsl:value-of select="RequestComment"/>
                          </xsl:when>
                          <xsl:otherwise>
                            <xsl:value-of select="$RequestComment"/>
                          </xsl:otherwise>
                        </xsl:choose>

                      </td>
                      <td>
                        <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
                      </td>
                      <td>
                        <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <br />
                <!--End Reference and Comment-->

                <!--Demerit Points, Class, Condition-->
                <xsl:for-each select="DriverInfo">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" class="reporttable1">
                    <col width="33%"/>
                    <col width="34%"/>
                    <col width="33%"/>
                    <tbody>
                      <tr>
                        <td>
                          <span class="abHighLabel">Demerit Points: </span>
                          <span class="abHighText">
                            <xsl:value-of select="DemeritPoints"/>
                          </span>
                        </td>
                        <td>
                          <span class="abHighLabel">Class: </span>
                          <span class="abHighText">
                            <xsl:value-of select="LicenceClass"/>
                            <!--Census788-->
                            <xsl:choose>
                              <xsl:when test='contains($myProvince,"NS")'>
                                <xsl:value-of select="LicenceEndorsement"/>
                              </xsl:when>
                              <!-- NS -->
                            </xsl:choose>
                          </span>
                        </td>
                        <td>
                          <xsl:choose>
                            <xsl:when test='not(contains($myProvince,"PE"))'>
                              <span class="abHighLabel">Conditions: </span>
                              <span class="abHighText">
                                <xsl:value-of select="LicenceCondition"/>
                              </span>
                            </xsl:when>
                            <!--PE-->
                          </xsl:choose>

                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <br />
                  <!--End Demerit Points, Class, Condition-->

                  <table border="0" cellpadding="0" cellspacing="0" width="100%" class="reporttable1">
                    <col width="19%" valign="top"/>
                    <col width="38%"/>
                    <col width="18%" valign="top"/>
                    <col width="25%"/>
                    <tbody>
                      <tr>
                        <!--TFS 12457  Alberta restricted driver comment  is now added to the First Licenced comment.   Changed display of Suspended Yes to Yes (Restricted) if this exist -->
                        <!--TFS 12694  Changed display of Yes (Restricted) to DRIVER HAS A RESTRICTED LICENCE -->
                        <xsl:choose>
                          <xsl:when test='contains($myProvince,"AB")' >
                            <td class="abLabel">Suspended:</td>
                            <td class="abText">
                              <xsl:choose>
                                <xsl:when test='contains(IsLicenceSuspended,"true")'>

                                  <xsl:if test='count(FirstLicencedComment)>0'>
                                    <xsl:text>DRIVER HAS A RESTRICTED LICENCE</xsl:text>
                                  </xsl:if>
                                  <xsl:if test='count(FirstLicencedComment)=0'>
                                    <xsl:text>YES</xsl:text>
                                  </xsl:if>

                                </xsl:when>
                                <xsl:otherwise>
                                  <xsl:text>NO</xsl:text>
                                </xsl:otherwise>
                              </xsl:choose>
                            </td>
                          </xsl:when>
                          <!-- AB -->
                          <!-- Census#1137 -->
                          <xsl:otherwise>
                            <td class="abLabel">Status:</td>
                            <td class="abText">
                              <xsl:choose>
                                <xsl:when test='contains($myProvince,"NS")'>
                                  <xsl:for-each select="LicenceStatusExpanded">
                                    <xsl:for-each select="Code">
                                      <xsl:apply-templates/>
                                      <xsl:variable name="myCounter" select="position()"/>
                                      <xsl:text>-</xsl:text>
                                      <xsl:value-of select="../Description[$myCounter]"/>
                                      <br/>
                                    </xsl:for-each>
                                    <!-- End Each Code -->
                                  </xsl:for-each>
                                  <!-- End Each LicenceStatusExpanded -->
                                </xsl:when>
                                <!-- NS -->
                                <xsl:otherwise>
                                  <xsl:value-of select="LicenceStatus"/>
                                </xsl:otherwise>
                                <!-- Not NS -->
                              </xsl:choose>
                            </td>
                          </xsl:otherwise>
                          <!-- Not NS -->
                        </xsl:choose>
                        <!--20151224 PS PEI - New fields has been added Task No: 13374-->
                        <xsl:choose>
                          <xsl:when test='contains($myProvince,"ON") or contains($myProvince,"AB") or contains($myProvince,"PE")' >
                            <td class="abLabel">Issue Date:</td>
                            <td valign="top" class="abText">
                              <!--<xsl:value-of select="LicenceIssueDate"/>-->
                              <xsl:call-template name="display-date">
                                <xsl:with-param name="pDate" select="LicenceIssueDate"/>
                              </xsl:call-template>
                            </td>
                          </xsl:when>
                          <!-- ON -->
                          <!-- Census#655 -->
                          <xsl:when test='contains($myProvince,"NS")'>
                            <td class="abLabel">First Licensed:</td>
                            <td valign="top" class="abText">
                              <!--<xsl:value-of select="LicenceIssueDate"/>-->
                              <xsl:call-template name="display-date">
                                <xsl:with-param name="pDate" select="LicenceIssueDate"/>
                              </xsl:call-template>
                            </td>
                          </xsl:when>
                          <!-- NS -->
                          <xsl:otherwise>
                            <td/>
                            <td/>
                          </xsl:otherwise>
                        </xsl:choose>
                      </tr>

                    </tbody>
                  </table>
                  <br />
                  <!-- Census#1034-->
                  <!--FirstLicencedComment-->
                  <xsl:if test='contains($myProvince,"NS") or contains($myProvince,"PE")'>
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="reporttable1">
                      <col width="27%" valign="top"/>
                      <col width="66%"/>
                      <!--col width="18%" valign="top"/>
						<col width="25%"/-->
                      <tbody>
                        <tr>
                          <xsl:if test='contains($myProvince,"NS")'>
                            <td class="abLabel">First Licence Comment:</td>
                          </xsl:if>
                          <!--20151224 PS PEI - New fields has been added Task No: 13374-->
                          <xsl:if test='contains($myProvince,"PE")'>
                            <td class="abLabel">Graduated Driver Licence: </td>
                          </xsl:if>
                          <td class="abText">
                            <xsl:value-of select="FirstLicencedComment"/>
                          </td>
                          <td>
                            <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
                          </td>
                          <td>
                            <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <br />
                  </xsl:if>
                  <!--End FirstLicencedComment-->
                </xsl:for-each>
                <!-- End Each Driver Info -->
              </xsl:if>
              <!-- End not QC -->

              <table border="0" cellpadding="0" cellspacing="0" width="100%" class="reporttable1">
                <col width="19%"/>
                <col width="38%"/>
                <col width="18%" align="left"/>
                <col width="25%" align="left"/>
                <tbody>
                  <xsl:if test='contains($myProvince,"QC")'>
                    <tr>
                      
                      <td class="abLabel">Licence Number:</td>
                      <td class="abText">                        
                            <xsl:value-of select="RequestInfo/DriverLicenceNumber"/>                          
                      </td>
                      <td class="abLabel">Name:</td>
                      <td class="abText">
                        <xsl:value-of select="DriverInfo/Name"/>
                      </td>
                    </tr>
                  </xsl:if>
                  <tr>
                    <td class="abLabel">Requested By:</td>
                    <td class="abText">
                      <xsl:choose>
                        <xsl:when test='string(RequestorName)' >
                          <xsl:value-of select="RequestorName"/>
                        </xsl:when>
                        <xsl:otherwise>
                          <xsl:value-of select="$RequestorName"/>
                        </xsl:otherwise>
                      </xsl:choose>
                    </td>
                    <td class="abLabel">User ID:</td>
                    <td class="abText">
                      <xsl:choose>
                        <xsl:when test='string(RequestorUserName)'>
                          <xsl:value-of select="RequestorUserName"/>
                        </xsl:when>
                        <xsl:otherwise>
                          <xsl:value-of select="$RequestorUserName"/>
                        </xsl:otherwise>
                      </xsl:choose>
                    </td>
                  </tr>
                  <tr>
                    <td class="abLabel">Requested On:</td>
                    <td class="abText">
                      <xsl:choose>
                        <xsl:when test='string(RequestDate)'>
                          <xsl:value-of select="RequestDate"/>
                        </xsl:when>
                        <xsl:otherwise>
                          <xsl:value-of select="$RequestDate"/>
                        </xsl:otherwise>
                      </xsl:choose>

                    </td>
                    <td class="abLabel">Reply Date:</td>
                    <td class="abText">
                      <xsl:choose>
                        <xsl:when test='string(ReplyDate)'>
                          <xsl:value-of select="ReplyDate"/>
                        </xsl:when>
                        <xsl:otherwise>
                          <xsl:value-of select="$ReplyDate"/>
                        </xsl:otherwise>
                      </xsl:choose>

                    </td>
                  </tr>
                  <tr>
                    <td class="abLabel">Print Date:</td>
                    <td class="abText">
                      <xsl:choose>
                        <xsl:when test='string(PrintDate)'>
                          <xsl:value-of select="PrintDate"/>
                        </xsl:when>
                        <xsl:otherwise>
                          <xsl:value-of select="$PrintDate"/>
                        </xsl:otherwise>
                      </xsl:choose>

                    </td>
                    <td class="abLabel">Reprint Date:</td>
                    <td class="abText">
                      <xsl:choose>
                        <xsl:when test='string(ReprintDate)'>
                          <xsl:value-of select="ReprintDate"/>
                        </xsl:when>
                        <xsl:otherwise>
                          <xsl:value-of select="$ReprintDate"/>
                        </xsl:otherwise>
                      </xsl:choose>

                    </td>
                  </tr>
                  <xsl:if test='contains($myProvince,"QC")'>
                    <tr>
                      <td class="abLabel">Reference:</td>
                      <td class="abText">

                        <xsl:choose>
                          <xsl:when test='string-length(RequestReference)>0'>
                            <xsl:value-of select="RequestReference"/>
                          </xsl:when>
                          <xsl:otherwise>
                            <xsl:value-of select="$RequestReference"/>
                          </xsl:otherwise>
                        </xsl:choose>
                        
                      </td>
                      <td class="abLabel">Comment:</td>
                      <td class="abText">

                        <xsl:choose>
                          <xsl:when test='string(RequestComment)'>
                            <xsl:value-of select="RequestComment"/>
                          </xsl:when>
                          <xsl:otherwise>
                            <xsl:value-of select="$RequestComment"/>
                          </xsl:otherwise>
                        </xsl:choose>
                         

                      </td>
                    </tr>
                    <tr>
                      <td class="abLabel">Batch Number:</td>
                      <td class="abText">
                       
                          <xsl:value-of select="AccountNumber"/>
                       
                      </td>
                      <td>
                        <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
                      </td>
                      <td>
                        <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
                      </td>
                    </tr>
                  </xsl:if>
                  <tr/>
                </tbody>
              </table>

              <xsl:if test='not(contains($myProvince,"QC"))'>
                <xsl:if test="count(Condition)>0 or count(Endorsement)>0  or count(Restriction)>0">
                  <br />
                  <br />
                  <table border="0" cellpadding="3" cellspacing="0" width="100%">
                    <col width="15%" align="center"/>
                    <col width="85%" />
                    <thead>
                      <tr>
                        <td class="abLabel">DATE</td>

                        <!--<xsl:choose>
                          <xsl:when test='(contains($myProvince,"PE"))'>
                            <td>
                              ID
                            </td>
                          </xsl:when>
                        </xsl:choose>-->

                        <td class="abLabel">
                          <xsl:choose>
                            <xsl:when test='not(contains($myProvince,"PE"))'>
                              CONDITIONS AND ENDORSEMENTS
                            </xsl:when>
                            <xsl:otherwise>
                              CONDITIONS, ENDORSEMENTS AND RESTRICTIONS
                            </xsl:otherwise>
                          </xsl:choose>
                        </td>
                      </tr>
                      <tr>
                        <xsl:choose>
                          <xsl:when test='contains($ExternalUsed,"YES")'>
                            <td>
                              <img height="1" alt="" src="blueline_pixel.gif" width="100%"/>
                            </td>
                            <td>
                              <img height="1" alt="" src="blueline_pixel.gif" width="100%"/>
                            </td>
                          </xsl:when>
                          <xsl:otherwise>
                            <td>
                              <img height="1" alt="" src="../images/blueline_pixel.gif" width="100%"/>
                            </td>
                            <td>
                              <img height="1" alt="" src="../images/blueline_pixel.gif" width="100%"/>
                            </td>
                          </xsl:otherwise>
                        </xsl:choose>

                      </tr>
                    </thead>
                    <tbody>
                      <xsl:if test='count(Condition)>0'>
                        <xsl:for-each select="Condition">
                          <tr valign="top">

                            <td  class="abText">
                              <!--<xsl:value-of select="Date"/>-->
                              <xsl:choose>
                                <xsl:when test='not(contains($myProvince,"PE"))'>
                                  <xsl:call-template name="display-date">
                                    <xsl:with-param name="pDate" select="Date"/>
                                  </xsl:call-template>
                                </xsl:when>
                                <xsl:otherwise>

                                </xsl:otherwise>
                              </xsl:choose>
                            </td>

                            <td style="word-wrap: break-word; width: 500px; display:inline-block" class="abText">

                              <xsl:choose>
                                <xsl:when test='contains($myProvince,"PE")'>
                                  <xsl:text>CONDITION:</xsl:text>
                                  <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
                                  <xsl:for-each select="Description">
                                    <xsl:apply-templates/>
                                  </xsl:for-each>
                                </xsl:when>
                                <xsl:otherwise>
                                  <xsl:for-each select="Description">
                                    <xsl:apply-templates/>
                                  </xsl:for-each>
                                </xsl:otherwise>
                              </xsl:choose>


                            </td>

                          </tr>

                        </xsl:for-each>
                      </xsl:if>

                      <xsl:if test='contains($myProvince,"PE") and count(Endorsement)>0'>
                        <xsl:for-each select="Endorsement">
                          <tr valign="top">
                            <td  class="abText"></td>

                            <td style="word-wrap: break-word; width: 500px; display:inline-block" class="abText">
                              <xsl:choose>
                                <xsl:when test='contains($myProvince,"PE")'>
                                  <xsl:text>ENDORSEMENT:</xsl:text>
                                  <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
                                  <xsl:for-each select="EndorsementName">
                                    <xsl:apply-templates/>
                                  </xsl:for-each>
                                </xsl:when>
                                <xsl:otherwise>
                                  <xsl:for-each select="EndorsementName">
                                    <xsl:apply-templates/>
                                  </xsl:for-each>
                                </xsl:otherwise>
                              </xsl:choose>

                            </td>
                          </tr>
                        </xsl:for-each>
                      </xsl:if>

                      <xsl:if test='contains($myProvince,"PE") and count(Restriction)>0'>
                        <xsl:for-each select="Restriction">
                          <tr valign="top">
                            <td  class="abText">
                              <xsl:call-template name="display-date">
                                <xsl:with-param name="pDate" select="ExpiryDate"/>
                              </xsl:call-template>
                            </td>
                            <td style="word-wrap: break-word; width: 500px; display:inline-block" class="abText">
                              <xsl:choose>
                                <xsl:when test='contains($myProvince,"PE")'>
                                  <xsl:text>RESTRICTION:</xsl:text>
                                  <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
                                  <xsl:for-each select="Description">
                                    <xsl:apply-templates/>
                                  </xsl:for-each>
                                </xsl:when>
                                <xsl:otherwise>
                                  <xsl:for-each select="Description">
                                    <xsl:apply-templates/>
                                  </xsl:for-each>
                                </xsl:otherwise>
                              </xsl:choose>
                            </td>
                          </tr>
                        </xsl:for-each>
                      </xsl:if>
                    </tbody>
                  </table>
                </xsl:if>
                <!-- End if count(Condition)>0 -->

                <xsl:if test='contains($myProvince,"AB") and count(DriverInfo/GraduatedDriverLicence)>0'>
                  <br/>
                  <table border="0" cellpadding="0" cellspacing="1%" width="90%">
                    <col width="5%"/>
                    <col width="80%"/>
                    <xsl:for-each select="DriverInfo/GraduatedDriverLicence">
                      <tr>
                        <td class="abText">
                          <xsl:value-of select="Description"/>
                        </td>
                      </tr>
                    </xsl:for-each>
                  </table>
                </xsl:if>
                <!-- End if contains($myProvince,"AB") and count(Reinstatement)>0 -->

                <xsl:if test='contains($myProvince,"AB") and count(Reinstatement)>0'>
                  <br/>
                  <p>
                    <span class="abLabel">ELIGIBLE REINSTATE DATE: </span>
                    <span class="abText">
                      <!--<xsl:value-of select="Reinstatement/EligibleDate"/>-->
                      <xsl:call-template name="display-date">
                        <xsl:with-param name="pDate" select="Reinstatement/EligibleDate"/>
                      </xsl:call-template>
                    </span>
                  </p>
                  <span class="abLabel">OUTSTANDING REINSTATEMENT CONDITIONS:</span>
                  <table border="0" cellpadding="0" cellspacing="1%" width="90%">
                    <col width="5%"/>
                    <col width="80%"/>
                    <xsl:for-each select="Reinstatement/Condition">
                      <tr>
                        <td class="abText">
                          <xsl:value-of select="Code"/>
                        </td>
                        <td class="abText">
                          <xsl:value-of select="Description"/>
                        </td>
                      </tr>
                    </xsl:for-each>
                  </table>
                </xsl:if>
                <!-- End if contains($myProvince,"AB") and count(Reinstatement)>0 -->

                <xsl:if test="(count(Conviction)+count(Suspension)+count(Reinstatement)+ count(Course) +count(Prohibition)+count(Restriction)+count(Merit)+count(Accident))>0">
                  <br />
                  <br />
                  <xsl:if test='contains($myProvince,"AB")'>
                    <span class="abLabel">CONVICTIONS, DISCHARGES AND OTHER ACTIONS</span>
                    <xsl:choose>
                      <xsl:when test='contains($ExternalUsed,"YES")'>
                        <img height="1" alt="" src="blueline_pixel.gif" width="100%"/>
                      </xsl:when>
                      <xsl:otherwise>
                        <img height="1" alt="" src="../images/blueline_pixel.gif" width="100%"/>
                      </xsl:otherwise>
                    </xsl:choose>

                    <pre class="abText">
                      <xsl:for-each select="Conviction">
                        <p>
                          <xsl:for-each select="PrintLine">
                            <xsl:value-of select="text()"/>
                            <br/>
                          </xsl:for-each>
                        </p>
                      </xsl:for-each>
                      <!-- End for each Conviction -->
                      <xsl:for-each select="Suspension">
                        <p>
                          <xsl:for-each select="PrintLine">
                            <xsl:value-of select="text()"/>
                            <br/>
                          </xsl:for-each>
                        </p>
                      </xsl:for-each>
                      <!-- End for each Suspension -->
                      <xsl:for-each select="Prohibition">
                        <p>
                          <xsl:for-each select="PrintLine">
                            <xsl:value-of select="text()"/>
                            <br/>
                          </xsl:for-each>
                        </p>
                      </xsl:for-each>
                      <!-- End for each Prohibition -->
                      <xsl:for-each select="Restriction">
                        <p>
                          <xsl:for-each select="PrintLine">
                            <xsl:value-of select="text()"/>
                            <br/>
                          </xsl:for-each>
                        </p>
                      </xsl:for-each>
                      <!-- End for each Restriction -->
                      <xsl:for-each select="Merit">
                        <p>
                          <xsl:for-each select="PrintLine">
                            <xsl:value-of select="text()"/>
                            <br/>
                          </xsl:for-each>
                        </p>
                      </xsl:for-each>
                      <!-- End for each Merit -->
                    </pre>
                  </xsl:if>
                  <!-- End AB -->

                  <xsl:if test='not(contains($myProvince,"AB")) and (not(contains($myProvince,"PE")) or (contains($myProvince,"PE") and (count(Conviction)+ count(Course) +count(Accident))>0) )'>
                    <table border="0" cellpadding="3" cellspacing="1%" width="100%">
                      <col width="15%" align="center"/>
                      <col width="85%"/>
                      <thead>
                        <tr>
                          <td class="abLabel">DATE</td>
                          <td class="abLabel">
                            <xsl:choose>
                              <xsl:when test='contains($myProvince,"NS")'>
                                <xsl:text disable-output-escaping="yes">PARTICULARS&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;ACCIDENT NUMBER SEV CASENO POINTS</xsl:text>
                              </xsl:when>
                              <!-- NS -->
                              <xsl:otherwise>
                                <xsl:text>CONVICTIONS, DISCHARGES AND OTHER ACTIONS</xsl:text>
                              </xsl:otherwise>
                            </xsl:choose>
                          </td>
                        </tr>
                        <tr>
                          <xsl:choose>
                            <xsl:when test='contains($ExternalUsed,"YES")'>
                              <td>
                                <img height="1" alt="" src="blueline_pixel.gif" width="100%"/>
                              </td>
                              <td>
                                <img height="1" alt="" src="blueline_pixel.gif" width="100%"/>
                              </td>
                            </xsl:when>
                            <xsl:otherwise>
                              <td>
                                <img height="1" alt="" src="../images/blueline_pixel.gif" width="100%"/>
                              </td>
                              <td>
                                <img height="1" alt="" src="../images/blueline_pixel.gif" width="100%"/>
                              </td>
                            </xsl:otherwise>
                          </xsl:choose>
                        </tr>
                      </thead>
                      <tbody>
                        <pre>
                          <xsl:for-each select="Conviction">
                            <tr valign="top">
                              <td class="abText">
                                <xsl:choose>
                                  <xsl:when test='count(ConvictionDate)>0'>
                                    <!--<xsl:value-of select="ConvictionDate"/>-->
                                    <xsl:call-template name="display-date">
                                      <xsl:with-param name="pDate" select="ConvictionDate"/>
                                    </xsl:call-template>
                                  </xsl:when>
                                  <xsl:otherwise>
                                    <xsl:text>00000000</xsl:text>
                                  </xsl:otherwise>
                                </xsl:choose>
                              </td>
                              <td style="word-wrap: break-word; width: 500px; display:inline-block" class="abText">
                                <pre>
                                  <xsl:choose>
                                    <xsl:when test='contains($myProvince,"NB")'>
                                      <xsl:value-of select="Description"/>
                                      <br/>
                                      <xsl:value-of select="Description[@lang='E']"/>
                                      <br/>
                                      <xsl:value-of select="Description[@lang='F']"/>
                                      <br/>
                                    </xsl:when>
                                    <!-- NB -->
                                    <xsl:when test='contains($myProvince,"NS")'>
                                      <xsl:value-of select="Description"/>
                                      <br/>
                                      <xsl:text disable-output-escaping="yes">&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;</xsl:text>
                                      <xsl:value-of select="MinistryCode"/>
                                      <xsl:text disable-output-escaping="yes">&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;0&amp;nbsp;&amp;nbsp;&amp;nbsp;</xsl:text>
                                      <xsl:value-of select="DemeritPoints"/>
                                      <br/>
                                      <xsl:text>OFFENCE DATE: </xsl:text>
                                      <xsl:call-template name="display-date">
                                        <xsl:with-param name="pDate" select="OffenceDate"/>
                                      </xsl:call-template>
                                      <br/>
                                    </xsl:when>
                                    <!-- NS -->

                                    <xsl:when test='contains($myProvince,"PE")'>
                                      <xsl:text>STATUTE:</xsl:text>
                                      <xsl:value-of select="MinistryCode"/>
                                      <xsl:text> PROVINCE:</xsl:text>
                                      <!--01/20/2016 [Prathyusha S] Bug:14262 MVR PEI _ Conviction Province has been displayed as empty -->
                                      <xsl:value-of select="ProvinceCode"/>
                                      <br/>
                                      <xsl:value-of select="Description"/>
                                      <br/>
                                      <xsl:text>RSP:</xsl:text>
                                      <xsl:choose>
                                        <xsl:when test='string-length(RSPEICode)&gt;0'>
                                          <xsl:value-of select="RSPEICode"/>
                                        </xsl:when>
                                        <xsl:otherwise>
                                          <xsl:text disable-output-escaping="yes">&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;</xsl:text>
                                        </xsl:otherwise>
                                      </xsl:choose>
                                      <xsl:text disable-output-escaping="yes">&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;</xsl:text>
                                      <xsl:choose>
                                        <xsl:when test='contains(Status,"U")'>
                                          <xsl:text>CONVICTION UNDER APPEAL</xsl:text>
                                        </xsl:when>
                                        <xsl:when test='contains(Status,"P")'>
                                          <xsl:text>CONVICTION PARDONED</xsl:text>
                                        </xsl:when>
                                        <xsl:otherwise>
                                          <xsl:text disable-output-escaping="yes">&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;</xsl:text>
                                        </xsl:otherwise>
                                      </xsl:choose>
                                      <xsl:text disable-output-escaping="yes">&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;</xsl:text>
                                      <xsl:value-of select="DemeritPoints"/>
                                      <br/>
                                    </xsl:when>
                                    <!-- PE -->
                                    <xsl:when test='contains($myProvince,"NL")'>
                                      <xsl:text>CONVICTION NUMBER: </xsl:text>
                                      <xsl:value-of select="Code"/>
                                      <br/>
                                      <xsl:value-of select="Description"/>
                                      <br/>
                                    </xsl:when>
                                    <!-- NL -->
                                    <xsl:otherwise>
                                      <xsl:for-each select="Description">
                                        <xsl:apply-templates/>
                                        <br/>
                                      </xsl:for-each>
                                    </xsl:otherwise>
                                  </xsl:choose>
                                </pre>
                              </td>
                            </tr>
                          </xsl:for-each>
                          <!-- End Each Conviction -->
                          <xsl:for-each select="Suspension">
                            <tr valign="top">
                              <td class="abText">
                                <xsl:choose>
                                  <!-- Check Census 1873 and 1889; NB - use SuspendDate for batch, use StartDate for online -->
                                  <xsl:when test='contains($myProvince,"NB") and count(SuspendDate)>0'>
                                    <xsl:call-template name="display-date">
                                      <xsl:with-param name="pDate" select="SuspendDate"/>
                                    </xsl:call-template>
                                  </xsl:when>
                                  <xsl:otherwise>
                                    <xsl:choose>
                                      <xsl:when test='count(StartDate)=1'>
                                        <xsl:call-template name="display-date">
                                          <xsl:with-param name="pDate" select="StartDate"/>
                                        </xsl:call-template>
                                      </xsl:when>
                                      <xsl:otherwise>
                                        <xsl:text>00000000</xsl:text>
                                      </xsl:otherwise>
                                    </xsl:choose>
                                  </xsl:otherwise>
                                </xsl:choose>
                              </td>
                              <td class="abText">
                                <pre>
                                  <xsl:choose>
                                    <xsl:when test='contains($myProvince,"NB")'>
                                      <xsl:value-of select="Description"/>
                                      <br/>
                                      <xsl:value-of select="Description[@lang='E']"/>
                                      <br/>
                                      <xsl:value-of select="Description[@lang='F']"/>
                                      <br/>
                                    </xsl:when>
                                    <!-- NB -->
                                    <xsl:when test='contains($myProvince,"NS")'>
                                      <xsl:value-of select="Description"/>
                                      <br/>
                                      <xsl:text>EFF: </xsl:text>
                                      <xsl:value-of select="StartDate"/>
                                      <xsl:text> EXP: </xsl:text>
                                      <xsl:value-of select="ExpiryDate"/>
                                      <br/>
                                    </xsl:when>
                                    <!-- NS -->
                                    <xsl:when test='contains($myProvince,"NL")'>
                                      <xsl:text>SUSPENSION COUNT : </xsl:text>
                                      <xsl:value-of select="SuspendedMonthsCount"/>
                                      <br/>
                                      <xsl:text>#OF DAY SUSPENDED: </xsl:text>
                                      <xsl:value-of select="SuspendedDaysCount"/>
                                      <br/>
                                      <xsl:text>SUSPENDED UNTIL  : </xsl:text>
                                      <xsl:value-of select="ExpiryDate"/>
                                      <br/>
                                      <xsl:text>SUSP DESCRIPTION : </xsl:text>
                                      <xsl:value-of select="Description"/>
                                      <br/>
                                    </xsl:when>
                                    <!-- NL -->
                                    <xsl:otherwise>
                                      <xsl:for-each select="Description">
                                        <xsl:apply-templates/>
                                        <br/>
                                      </xsl:for-each>
                                    </xsl:otherwise>
                                  </xsl:choose>
                                </pre>
                              </td>
                            </tr>
                          </xsl:for-each>
                          <!-- End Each Suspension -->
                          <xsl:for-each select="Reinstatement">
                            <tr valign="top">
                              <td class="abText">
                                <!--<xsl:value-of select="Date"/>-->
                                <xsl:call-template name="display-date">
                                  <xsl:with-param name="pDate" select="Date"/>
                                </xsl:call-template>
                              </td>
                              <td class="abText">
                                <xsl:value-of select="Description"/>
                                <br/>
                                <br/>
                              </td>
                            </tr>
                          </xsl:for-each>
                          <!-- End Each Reinstatement -->
                          <xsl:for-each select="Accident">
                            <tr valign="top">
                              <td class="abText">
                                <xsl:choose>
                                  <xsl:when test='count(Date)=1'>
                                    <!--<xsl:value-of select="Date"/>-->
                                    <xsl:call-template name="display-date">
                                      <xsl:with-param name="pDate" select="Date"/>
                                    </xsl:call-template>
                                  </xsl:when>
                                  <xsl:otherwise>
                                    <xsl:text>00000000</xsl:text>
                                  </xsl:otherwise>
                                </xsl:choose>
                              </td>
                              <td style="word-wrap: break-word; width: 500px; display:inline-block"  class="abText">
                                <pre>
                                  <xsl:choose>
                                    <xsl:when test='contains($myProvince,"NB")'>
                                      <xsl:text>ACCIDENT</xsl:text>
                                      <xsl:if test='string-length(Description)>0'>
                                        <xsl:value-of select="concat(' / ',Description)"/>
                                      </xsl:if>
                                    </xsl:when>
                                    <!-- NB -->
                                    <xsl:when test='contains($myProvince,"NS")'>
                                      <xsl:value-of select="Description"/>
                                      <br/>
                                      <xsl:value-of select="ReportRetrievalNum"/>
                                    </xsl:when>
                                    <!-- NS -->
                                    <xsl:when test='contains($myProvince,"NL")'>
                                      <xsl:text>CASE NUMBER  : </xsl:text>
                                      <xsl:value-of select="Code"/>
                                      <br/>
                                      <xsl:text>ACCIDENT TYPE: </xsl:text>
                                      <xsl:value-of select="Type"/>
                                      <br/>
                                      <xsl:text>DAMAGE AMOUNT: </xsl:text>
                                      <xsl:value-of select="DamageAmount"/>
                                    </xsl:when>
                                    <!-- NL -->
                                    <xsl:when test='contains($myProvince,"PE")'>
                                      <xsl:text>PROVINCE:</xsl:text>
                                      <xsl:value-of select="Province"/>
                                      <xsl:text disable-output-escaping="yes">&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;PROPERTY DAMAGE:</xsl:text>
                                      <xsl:value-of select="PropertyDamage"/>
                                      <xsl:text disable-output-escaping="yes">&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;FATALITIES:</xsl:text>
                                      <xsl:value-of select="Fatalities"/>
                                      <xsl:text disable-output-escaping="yes">&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;INJURED:</xsl:text>
                                      <xsl:value-of select="Injury"/>
                                    </xsl:when>
                                    <!-- PE -->
                                    <xsl:otherwise>
                                    </xsl:otherwise>
                                  </xsl:choose>
                                </pre>
                                <br/>
                              </td>
                            </tr>
                          </xsl:for-each>
                          <!-- End Each Accident -->
                          <xsl:for-each select="Course">
                            <tr valign="top">
                              <td class="abText">
                                <xsl:choose>
                                  <xsl:when test='count(Date)=1'>
                                    <!--<xsl:value-of select="Date"/>-->
                                    <xsl:call-template name="display-date">
                                      <xsl:with-param name="pDate" select="Date"/>
                                    </xsl:call-template>
                                  </xsl:when>
                                  <xsl:otherwise>
                                    <xsl:text>00000000</xsl:text>
                                  </xsl:otherwise>
                                </xsl:choose>
                              </td>
                              <td style="word-wrap: break-word; width: 500px; display:inline-block"  class="abText">
                                <pre>
                                  <xsl:value-of select="Description"/>
                                </pre>
                              </td>
                            </tr>
                          </xsl:for-each>
                          <!-- End Each Course -->
                        </pre>
                      </tbody>
                    </table>
                  </xsl:if>
                  <!-- End Not AB -->
                </xsl:if>
                <!-- End (count(Conviction)+count(Suspension)+count(Reinstatement)+count(Prohibition)+count(Restriction)+count(Merit)+count(Accident))>0 -->

                <xsl:if test='count(ProviderMessage)>0'>
                  <br/>
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <col width="15%"/>
                    <col width="85%"/>
                    <xsl:for-each select="ProviderMessage">
                      <tr valign="top">
                        <td/>
                        <td class="abText">
                          <xsl:for-each select="Text">
                            <xsl:value-of select="text()"/>
                            <br/>
                          </xsl:for-each>
                        </td>
                      </tr>
                    </xsl:for-each>
                    <!-- End Each ProviderMessage-->
                  </table>

                  <br/>

                  <xsl:if test='not(contains($myProvince,"PE"))'>
                    <div align="Center" class="abLabel">*** END OF REPORT / FIN DU RAPPORT ***</div>
                  </xsl:if>
                </xsl:if>
                <!-- End count(ProviderMessage)>0 -->

                <xsl:if test='count(ProviderError)=0'>
                  <br/>
                  <table border="0" cellpadding="0" cellspacing="1%" width="80%">
                    <col width="22%"/>
                    <col width="15%" align="center"/>
                    <col width="15%" align="center"/>
                    <col width="15%" align="center"/>
                    <col width="6%" align="center"/>
                    <col width="6%" align="center"/>
                    <xsl:if test='contains($myProvince,"NB")'>
                      <col width="6%" align="center"/>
                    </xsl:if>
                    <tbody>
                      <tr>
                        <td class="abLabel">Licence Number</td>
                        <td class="abLabel">ReplyDt</td>
                        <td class="abLabel">BirDt</td>
                        <td class="abLabel">ExpDt</td>
                        <td class="abLabel">Class</td>
                        <xsl:choose>
                          <xsl:when test='not(contains($myProvince,"NB"))'>
                            <td class="abLabel">Pt</td>
                          </xsl:when>
                          <!-- Not NB -->
                          <xsl:otherwise>
                            <td class="abLabel">En</td>
                            <td class="abLabel">Rest</td>
                          </xsl:otherwise>
                          <!-- NB -->
                        </xsl:choose>
                      </tr>
                      <tr class="abtext">
                        <td class="abText">
                          <xsl:choose>
                            <xsl:when test='contains($myProvince,"ON")'>
                              <xsl:value-of select="concat(substring(DriverInfo/LicenceNumber,1,5),'-',substring(DriverInfo/LicenceNumber,6,5),'-',substring(DriverInfo/LicenceNumber,11,5))"/>
                            </xsl:when>
                            <!-- ON -->
                            <xsl:otherwise>
                              <xsl:value-of select="DriverInfo/LicenceNumber"/>
                            </xsl:otherwise>
                            <!-- Not ON -->
                          </xsl:choose>
                        </td>
                        <td class="abText">
                          <xsl:choose>
                            <xsl:when test='string(ReplyDate)'>
                              <xsl:value-of select="ReplyDate"/>
                            </xsl:when>
                            <xsl:otherwise>
                              <xsl:value-of select="$ReplyDate"/>
                            </xsl:otherwise>
                          </xsl:choose>
                        </td>
                        <td class="abText">
                          <!--<xsl:value-of select="DriverInfo/BirthDate"/>-->
                          <xsl:call-template name="display-date">
                            <xsl:with-param name="pDate" select="DriverInfo/BirthDate"/>
                          </xsl:call-template>
                        </td>
                        <td class="abText">
                          <!--<xsl:value-of select="DriverInfo/LicenceExpiryDate"/>-->
                          <xsl:call-template name="display-date">
                            <xsl:with-param name="pDate" select="DriverInfo/LicenceExpiryDate"/>
                          </xsl:call-template>
                        </td>
                        <td class="abText">
                          <!--Census 788 -->
                          <xsl:value-of select="DriverInfo/LicenceClass"/>
                          <xsl:choose>
                            <xsl:when test='contains($myProvince,"NS")'>
                              <xsl:value-of select="DriverInfo/LicenceEndorsement"/>
                            </xsl:when>
                            <!-- NS -->
                          </xsl:choose>
                        </td>
                        <xsl:choose>
                          <xsl:when test='not(contains($myProvince,"NB"))'>
                            <td class="abText">
                              <xsl:value-of select="DriverInfo/DemeritPoints"/>
                            </td>
                          </xsl:when>
                          <!-- not NB -->
                          <xsl:otherwise>
                            <td class="abText">
                              <xsl:value-of select="DriverInfo/LicenceEndorsement"/>
                            </td>
                            <td class="abText">
                              <xsl:value-of select="DriverInfo/LicenceRestriction"/>
                            </td>
                          </xsl:otherwise>
                          <!-- NB -->
                        </xsl:choose>
                      </tr>
                    </tbody>
                  </table>
                  <br/>

                  <div align="Center" class="abLabel">*** END OF REPORT / FIN DU RAPPORT ***</div>
                </xsl:if>
                <!-- End count(ProviderError)=0 -->

                <!-- end of otherwise for non-Quebec abstract -->
              </xsl:if>
              <!-- Not QC -->

              <xsl:if test='contains($myProvince,"QC")'>
					<xsl:if test='count(Report)>0'>
						<xsl:for-each select="Report">
							<pre class="abText">
								<xsl:for-each select="PrintLine">
									<xsl:value-of select="text()"/>
									<br/>
								</xsl:for-each>
							</pre>
						</xsl:for-each>
					</xsl:if>
				</xsl:if><!-- QC -->

              <!-- ERROR REPORT -->

              <xsl:if test='count(ProviderError)>0'>
                <br />
                <br/>
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <col width="10%" align="center"/>
                  <col width="90%"/>
                  <thead>
                    <tr>
                      <td class="abLabel">CODE</td>
                      <td class="abLabel">ERROR DESCRIPTION</td>
                    </tr>
                    <tr>
                      <xsl:choose>
                        <xsl:when test='contains($ExternalUsed,"YES")'>
                          <td>
                            <img height="1" alt="" src="blueline_pixel.gif" width="100%"/>
                          </td>
                          <td>
                            <img height="1" alt="" src="blueline_pixel.gif" width="100%"/>
                          </td>
                        </xsl:when>
                        <xsl:otherwise>
                          <td>
                            <img height="1" alt="" src="../images/blueline_pixel.gif" width="100%"/>
                          </td>
                          <td>
                            <img height="1" alt="" src="../images/blueline_pixel.gif" width="100%"/>
                          </td>
                        </xsl:otherwise>
                      </xsl:choose>

                    </tr>
                  </thead>
                  <tbody>
                    <xsl:for-each select="ProviderError">
                      <tr valign="top">
                        <td class="abText">
                          <xsl:value-of select="Code"/>
                        </td>
                        <td class="abText">
                          <xsl:value-of select="Text"/>
                        </td>
                      </tr>
                    </xsl:for-each>
                    <!-- Each Provider Error -->
                  </tbody>
                </table>
              </xsl:if>
              <!-- End count(ProviderError)>0 -->

              <xsl:if test='contains($myProvince,"PE") and count(ProviderError)> 0'>
                <div align="Center" class="abLabel">*** END OF REPORT / FIN DU RAPPORT ***</div>
              </xsl:if>

              <br />
              <div align="Right" class="absubHeading">
                <xsl:text>Receipt Number : </xsl:text>
                <span class="absubText">
                  <xsl:value-of select="RequestId"/>
                </span>
              </div>
            </td>
          </tr>
        </table>
        <br />
        <h3>
          <br style="height:0; line-height:0"/>
        </h3>
      </body>
    </html>
  </xsl:template>

  <!-- template to display dates in format dd/mm/yyyy -->
  <xsl:template name="display-date">
    <xsl:param name="pDate"/>
    <!--
			if date passed in 'yyyy-mm-dd' format, then display as 'dd/mm/yyyy' format
			otherwise display what is passed as is
		-->
    <xsl:choose>
      <xsl:when test='string-length($pDate)=10 and contains(substring($pDate,5,1),"-")'>
        <xsl:value-of select="concat(substring($pDate,9,2),'/',substring($pDate,6,2),'/',substring($pDate,1,4))"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="$pDate"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>



</xsl:stylesheet>
