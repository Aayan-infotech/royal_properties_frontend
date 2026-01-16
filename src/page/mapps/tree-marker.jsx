import React, { useCallback } from 'react';
import { AdvancedMarker } from '@vis.gl/react-google-maps';

/**
 * Wrapper Component for an AdvancedMarker for a single tree.
 */
export const TreeMarker = (props) => {
    const { tree, onClick, setMarkerRef } = props;

    const handleClick = useCallback(() => onClick(tree), [onClick, tree]);
    const ref = useCallback(
        (marker) => setMarkerRef(marker, tree.key),
        [setMarkerRef, tree.key]
    );

    return (
        <AdvancedMarker position={tree.position} ref={ref} onClick={handleClick}>
            <span className="marker-clustering-tree">🌳</span>
        </AdvancedMarker>
    );
};