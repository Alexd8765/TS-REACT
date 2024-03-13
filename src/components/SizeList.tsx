import { FC } from 'react';

const possibleSizes = ['XS','S','M','L','XL','XXL'];


interface Props {
    selectedSize: string;
    onSizeChange: ( size: string ) => void;
}
export const SizeList:FC<Props> = ({ selectedSize, onSizeChange }) => {
    return (
            <select value={selectedSize} onChange={(e => onSizeChange(e.target.value))}>
            {
                possibleSizes.map( size => (
                       <option key={size} value={size}> 
                            { size } 
                        </option>
                ))
            }
            </select>
            )
}