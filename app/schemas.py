"""WrongPedia API schemas."""

from typing import List, Optional
from pydantic import BaseModel


class ArticleGenerateRequest(BaseModel):
    """Request to generate a new article."""
    topic: str


class InfoboxField(BaseModel):
    label: str
    value: str


class Infobox(BaseModel):
    title: str
    fields: List[InfoboxField]


class ArticleSection(BaseModel):
    id: str
    title: str
    level: int = 2
    content: str


class ArticleReference(BaseModel):
    id: int
    text: str


class ArticleResponse(BaseModel):
    """Full Wikipedia-style article response."""
    title: str
    hatnote: Optional[str] = None
    lead: str
    infobox: Infobox
    sections: List[ArticleSection]
    references: List[ArticleReference]
    categories: List[str]


class RandomTopicResponse(BaseModel):
    topic: str
