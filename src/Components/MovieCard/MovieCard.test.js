import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from "enzyme-to-json";
import MovieCard from './MovieCard';

const movie = {
    _id :"5e9411ab7b32077f7c7daa13",
    name :"The eagle eye",
    description :"Eagle eye",
    language :"English",
    date :new Date("2020-04-13T07:14:23.695Z"),
    img :"",
    img_name :"",
    created_on :new Date("2020-04-13T07:15:55.874Z"),
    created_by :{
       id:"5e9411677b32077f7c7daa12",
       username:"Saravanan"
    },
    ratings:[
       {
          comment:"Everybody don't miss that 😉",
          rating:5,
          id:"5e9411677b32077f7c7daa12",
          username:"Saravanan"
       }
    ]
 };

const MovieWrapper = shallow(<MovieCard movie={movie}/>);

describe("MovieCard", () => {
  it("should render Movie Card", () => {
    expect(shallowToJson(MovieWrapper)).toMatchSnapshot();
  });
});