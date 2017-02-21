<?xml version='1.0'?>
<xsl:stylesheet version="1.0"
      xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" encoding="utf-8"/>

  <!-- XSLT 1.0 does not support the replace() function. -->
  <!-- This string-replace-all template may be called instead of the replace function -->
  <xsl:template name="string-replace-all">
    <xsl:param name="text" />
    <xsl:param name="replace" />
    <xsl:param name="by" />
    <xsl:choose>
      <xsl:when test="contains($text, $replace)">
        <xsl:value-of select="substring-before($text,$replace)" />
        <xsl:value-of select="$by" />
        <xsl:call-template name="string-replace-all">
          <xsl:with-param name="text"
          select="substring-after($text,$replace)" />
          <xsl:with-param name="replace" select="$replace" />
          <xsl:with-param name="by" select="$by" />
        </xsl:call-template>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="$text" />
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template match="/">
    <html>
      <body>
        <div style="font-family: monospace">

          <xsl:for-each select="/DriverClaimHistoryGoldDS/PrintFormatAbstractDT">

            <!-- Ensures that the print lines are all in the proper numeric sequence -->
            <xsl:sort order="ascending" data-type="number" select="PrintLineSequence" />


            <!-- Invoke the string-replace-all template to ensure all whitespaces are converted into the proper HTML Non-Breacking Space &nbsp;  -->
            <xsl:variable name="PrintLineTextWithPreservedSpaces">
              <xsl:call-template name="string-replace-all">
                <xsl:with-param name="text" select="PrintLineText" />
                <xsl:with-param name="replace" select="' '" />
                <xsl:with-param name="by" select="'&#160;'" />
              </xsl:call-template>
            </xsl:variable>

            <xsl:value-of select="$PrintLineTextWithPreservedSpaces" />
            <br/>
          </xsl:for-each>

        </div>
      </body>
    </html>

  </xsl:template>
</xsl:stylesheet>