import React from "react";
import { Card, Badge, ButtonGroup, ToggleButton } from "react-bootstrap";

const Tags = ({ posts, selectedTag, handleChangeTag }) => {
  const uniqueTags = posts.map((post) => post.category.map((c) => c.name));
  const objTags = {};
  uniqueTags.forEach((tag) => {
    tag.forEach((item) => {
      if (!objTags.hasOwnProperty(item)) {
        objTags[item] = 1;
      } else {
        objTags[item] += 1;
      }
    });
  });

  const arrayTags = Object.entries(objTags);

  return (
    <>
      <Card className='rounded-0 border-0 mb-4 bg-light'>
        <Card.Body>
          <h2
            className='h5 mb-3 text-uppercase'
            style={{ letterSpacing: "1px", fontFamily: "Dancing Script" }}
          >
            Tags
          </h2>
          <ButtonGroup toggle vertical>
            {arrayTags.map((item, idx) => (
              <ToggleButton
                key={item[0]}
                type='radio'
                className='mb-2 d-flex justify-content-between text-capitalize text-dark border'
                variant='outline-light'
                name='tag'
                value={item[0]}
                checked={selectedTag === item[0]}
                onChange={(e) => handleChangeTag(e)}
              >
                <span style={{ fontWeight: "600px" }}>{item[0]}</span>

                <Badge
                  pill
                  variant='light'
                  className='ml-5'
                  style={{ paddingTop: "5px", color: "#1877f2" }}
                >
                  <span>{item[1]}</span>
                </Badge>
              </ToggleButton>
            ))}
          </ButtonGroup>
        </Card.Body>
      </Card>
    </>
  );
};

export default Tags;
