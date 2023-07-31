import { useContext, useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link'

import Card from './ui/Card';

import styles from '@/styles/CardStyles.module.css'

const InfiniteList = ({visiblePhotos}) => {

  return (
    <div>
      <div>
        {visiblePhotos.map((photo, index) => (
          <Card photo={photo} key={`${photo.id}-${index}`} />
        ))}
      </div>

    </div>
  );
};

export default InfiniteList;