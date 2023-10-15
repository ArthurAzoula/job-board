import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaChevronRight } from "react-icons/fa";

const Breadcrumb = ({ items }) => {
    const breadcrumbString = items.map((item, index) => {
        if (index === 0) {
            return (
                <React.Fragment key={index}>
                        <Link to="/">
                            <FaHome />
                        </Link>
                    <FaChevronRight />

                </React.Fragment>
            );
        } else if (index === items.length - 1) {
            return <span key={index}>{item.label}</span>;
        } else {
            return (
                <React.Fragment key={index}>
                    <Link to={item.path}>{item.label}</Link>
                    <FaChevronRight />
                </React.Fragment>
            );
        }
    });

    return <nav className="flex items-center mx-2 my-2" aria-label="breadcrumb">{breadcrumbString}</nav>;
};

export default Breadcrumb;