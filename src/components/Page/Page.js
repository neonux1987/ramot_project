import React from 'react';
import { page } from './Page.module.css';

const Page = props => <div className={page}>{props.children}</div>

export default Page;