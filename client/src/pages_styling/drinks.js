//import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";

// export const StyledLink = styled(Link)`
// display: flex;
// align-items: center;
// padding: 0 1rem;
// height: 100%;
// cursor: pointer;
// &.active {
// 	color: #f0f0f0;
// }
// `;
export const StyledLink = styled(Link)`
  /* Add your desired styles here */
  font-size: 30px;

  margin: 10px;
  padding: 20px 40px;
  display: inline-block;
  color: AliceBlue;
  text-decoration: none;
`;

export const StyledLinkHome = styled(Link)`
  /* Add your desired styles here */
  font-size: 30px;

  margin: 10px;
  padding: 20px 40px;
  display: inline-block;
  border: 1px solid black;
  border-radius: 5px;
  background-color: red;
  color: white;
  text-decoration: none;
`;

