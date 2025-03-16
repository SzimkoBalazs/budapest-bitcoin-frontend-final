'use client';

import React, {useState} from "react";
import ContentWrapper from "@/utilities/ContentWrapper";
import WhatToExpectCard from "@/components/WhatToExpectCard";
import SectionMainTitle from "@/components/SectionMainTitle";
import TopicAccordion from '@/components/Topics/TopicAccordion';

const TopicsContainer = ({topics}) => {
    const [allTopics, setAllTopics] = useState(topics)
    console.log('all topics: ', allTopics)

    function handleOpen(order){
        setAllTopics((prevTopics)=>{
            return prevTopics.map((topic)=>{
                return topic.order === order ? {...topic, isOpened: !topic.isOpened} : {...topic, isOpened: false}
            })
        })
    }

  return (
        <div className="flex flex-col items-center gap-y-6">
          {allTopics?.map((topic)=>{
            return (
                <TopicAccordion data={topic} onClick={()=>handleOpen(topic.order)} />
            )
          })}
        </div>
  );
};

export default TopicsContainer;
