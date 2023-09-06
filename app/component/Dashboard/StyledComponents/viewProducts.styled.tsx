
import styled from 'styled-components';
import { Dialog } from 'primereact/dialog';

// @ts-ignore
export const StyledDialog = styled(Dialog)`
	width: 80vw;
    //max-width: 500px;
	z-index: 1;
	overflow: hidden;

      @media screen and (min-width: 641px) {
        width: 70vw;
        overflow: hidden;
      }
  
	 @media screen and (min-width: 768px) {
		width: 70vw;
		overflow: hidden;
	 }

     @media screen and (min-width: 960px) {
        width: 40vw;
        overflow: hidden;
     }
  
	@media screen and (min-width: 1024px) {
		width: 40vw;
		overflow: hidden;
	}
  
`;

export const ProductDetailsContainer = styled.div`
  //padding: 24px;
  text-align: center;
  display: flex;
  flex-direction: column;

`;
export const DetailRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: start;
    margin: 10px 6px;
`;

export const DetailLabel = styled.span`
    font-size: 14px;
    font-weight:bold;
    color: #777;
     text-align:start;
    //flex-basis: 40%; 
`;

export const DetailValue = styled.span`
    font-size: 16px;
    color: #444;
  text-align:start;
  padding-left:2rem;
    //flex-basis: 60%; 
`;

export const ProductName = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
`;

export const ProductDescription = styled.p`
  font-size: 16px;
  margin-top: 12px;
  color: #777;
`;
export const DetailItem = styled.p`
    font-size: 14px;
    margin: 10px 0;
    color: #444;
`;