<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:param name="idArticle" />
  <xsl:template match="/">
      <xsl:choose>
        <xsl:when test="response/newsList/news[id=$idArticle]/text != ''">
            <p><xsl:value-of select="response/newsList/news[id=$idArticle]/text" /></p>
        </xsl:when>
        <xsl:otherwise>
          <strong>We're sorry!</strong>
          <p>Article content has not been found!</p>
        </xsl:otherwise>
      </xsl:choose>
  </xsl:template>
</xsl:stylesheet> 