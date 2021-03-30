<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template name="FormatDate">
    <xsl:param name="DateTime" />
      <xsl:value-of select="substring($DateTime,0,11)" />
  </xsl:template>
  <xsl:template match="/">
    <div class="round10">
      <strong>Just a new List</strong>
      <ul>
        <xsl:for-each select="response/newsList/news">
          <li class="item round5">
            <xsl:attribute name="id">
              <xsl:value-of select="concat('item-', id)"/>
            </xsl:attribute>
            <strong><xsl:value-of select="title" /></strong>
            <p class="short-desc"><xsl:value-of select="shortText" /></p>
            <p class="date"><xsl:call-template name="FormatDate">
              <xsl:with-param name="DateTime" select="date" />
            </xsl:call-template></p>
          </li>
        </xsl:for-each>
      </ul>
    </div>
  </xsl:template>
</xsl:stylesheet> 