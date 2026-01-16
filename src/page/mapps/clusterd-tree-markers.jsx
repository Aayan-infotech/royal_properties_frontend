// import { InfoWindow, useMap } from '@vis.gl/react-google-maps';
// import React, { useCallback, useEffect, useMemo, useState } from 'react';
// import { MarkerClusterer } from '@googlemaps/markerclusterer';
// import { TreeMarker } from './tree-marker';

// /**
//  * The ClusteredTreeMarkers component is responsible for integrating the
//  * markers with the markerclusterer.
//  */
// export const ClusteredTreeMarkers = ({ trees }) => {
//     const [markers, setMarkers] = useState({});
//     const [selectedTreeKey, setSelectedTreeKey] = useState(null);

//     const selectedTree = useMemo(
//         () =>
//             trees && selectedTreeKey
//                 ? trees.find(t => t.key === selectedTreeKey)
//                 : null,
//         [trees, selectedTreeKey]
//     );

//     // create the markerClusterer once the map is available and update it when
//     // the markers are changed
//     const map = useMap();
//     const clusterer = useMemo(() => {
//         if (!map) return null;

//         return new MarkerClusterer({ map });
//     }, [map]);

//     useEffect(() => {
//         if (!clusterer) return;

//         clusterer.clearMarkers();
//         clusterer.addMarkers(Object.values(markers));
//     }, [clusterer, markers]);

//     // this callback will effectively get passsed as ref to the markers to keep
//     // tracks of markers currently on the map
//     const setMarkerRef = useCallback((marker, key) => {
//         setMarkers(markers => {
//             if ((marker && markers[key]) || (!marker && !markers[key]))
//                 return markers;

//             if (marker) {
//                 return { ...markers, [key]: marker };
//             } else {
//                 const { [key]: _, ...newMarkers } = markers;

//                 return newMarkers;
//             }
//         });
//     }, []);

//     const handleInfoWindowClose = useCallback(() => {
//         setSelectedTreeKey(null);
//     }, []);

//     const handleMarkerClick = useCallback((tree) => {
//         setSelectedTreeKey(tree.key);
//     }, []);

//     return (
//         <>
//             {trees.map(tree => (
//                 <TreeMarker
//                     key={tree.key}
//                     tree={tree}
//                     onClick={handleMarkerClick}
//                     setMarkerRef={setMarkerRef}
//                 />
//             ))}

//             {selectedTreeKey && (
//                 <InfoWindow
//                     anchor={markers[selectedTreeKey]}
//                     onCloseClick={handleInfoWindowClose}>
//                     {selectedTree?.name}
//                 </InfoWindow>
//             )}
//         </>
//     );
// };




import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { APIProvider, Map, AdvancedMarker, InfoWindow, useMap } from '@vis.gl/react-google-maps';
import { MarkerClusterer } from '@googlemaps/markerclusterer';

// Import tree data from JSON
const treesData = [
  { "name": "Ash, green", "category": "ash", "position": { "lat": 43.649536, "lng": -79.416187 } },
  { "name": "Birch, white", "category": "birch", "position": { "lat": 43.803719, "lng": -79.354535 } },
  { "name": "Maple, Manitoba", "category": "maple", "position": { "lat": 43.677625, "lng": -79.27608 } },
  { "name": "Elm, American 'Valley Forge'", "category": "elm", "position": { "lat": 43.743692, "lng": -79.425206 } },
  { "name": "Spruce, Colorado blue", "category": "spruce", "position": { "lat": 43.733889, "lng": -79.315376 } },
  { "name": "Maple, Norway 'Schwedler'", "category": "maple", "position": { "lat": 43.713252, "lng": -79.551785 } },
  { "name": "Mulberry, white", "category": "mulberry", "position": { "lat": 43.758245, "lng": -79.377848 } },
  { "name": "Elm, Siberian", "category": "elm", "position": { "lat": 43.692469, "lng": -79.479295 } },
  { "name": "Kentucky coffee", "category": "kentucky_coffee", "position": { "lat": 43.757918, "lng": -79.569502 } },
  { "name": "Katsura, Japanese", "category": "katsura", "position": { "lat": 43.64681, "lng": -79.45259 } },
  { "name": "Oak, white", "category": "oak", "position": { "lat": 43.705484, "lng": -79.517828 } },
  { "name": "Honey locust, 'Skyline'", "category": "honey_locust", "position": { "lat": 43.661668, "lng": -79.569728 } },
  { "name": "Cherry", "category": "cherry", "position": { "lat": 43.657817, "lng": -79.408632 } },
  { "name": "Hackberry", "category": "hackberry", "position": { "lat": 43.748501, "lng": -79.505892 } },
  { "name": "Ash, green", "category": "ash", "position": { "lat": 43.722747, "lng": -79.400488 } },
  { "name": "Apple, Sargents", "category": "apple", "position": { "lat": 43.810627, "lng": -79.331971 } },
  { "name": "Mountain ash, European", "category": "mountain_ash", "position": { "lat": 43.712975, "lng": -79.437332 } },
  { "name": "Tulip tree", "category": "tulip_tree", "position": { "lat": 43.781231, "lng": -79.271087 } },
  { "name": "Pear, 'Chanticleer'", "category": "pear", "position": { "lat": 43.664706, "lng": -79.379063 } },
  { "name": "Cedar, white", "category": "cedar", "position": { "lat": 43.678174, "lng": -79.386469 } },
  { "name": "Planetree, London", "category": "planetree", "position": { "lat": 43.638764, "lng": -79.399562 } },
  { "name": "Ginkgo", "category": "ginkgo", "position": { "lat": 43.629981, "lng": -79.509956 } },
  { "name": "Pine, Eastern white", "category": "pine", "position": { "lat": 43.658251, "lng": -79.533652 } },
  { "name": "Linden, Littleleaf", "category": "linden", "position": { "lat": 43.737635, "lng": -79.207782 } },
  { "name": "Basswood, American", "category": "basswood", "position": { "lat": 43.700027, "lng": -79.383619 } }
];

// Add keys to trees
for (let i = 0; i < treesData.length; i++) {
  treesData[i].key = `tree-${i}`;
}

// Helper functions
function getCategories(trees) {
  if (!trees) return [];
  const countByCategory = {};
  for (const t of trees) {
    if (!countByCategory[t.category]) countByCategory[t.category] = 0;
    countByCategory[t.category]++;
  }
  return Object.entries(countByCategory).map(([key, value]) => {
    const label = key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    return { key, label, count: value };
  });
}

async function loadTreeDataset() {
  return new Promise(resolve => {
    setTimeout(() => resolve(treesData), 500);
  });
}

// TreeMarker Component
const TreeMarker = ({ tree, onClick, setMarkerRef }) => {
  const handleClick = useCallback(() => onClick(tree), [onClick, tree]);
  const ref = useCallback(
    (marker) => setMarkerRef(marker, tree.key),
    [setMarkerRef, tree.key]
  );

  return (
    <AdvancedMarker position={tree.position} ref={ref} onClick={handleClick}>
      <span style={{ fontSize: '24px' }}>🌳</span>
    </AdvancedMarker>
  );
};

// ClusteredTreeMarkers Component
export const ClusteredTreeMarkers = ({ trees }) => {
  const [markers, setMarkers] = useState({});
  const [selectedTreeKey, setSelectedTreeKey] = useState(null);

  const selectedTree = useMemo(
    () => trees && selectedTreeKey ? trees.find(t => t.key === selectedTreeKey) : null,
    [trees, selectedTreeKey]
  );

  const map = useMap();
  const clusterer = useMemo(() => {
    if (!map) return null;
    return new MarkerClusterer({ map });
  }, [map]);

  useEffect(() => {
    if (!clusterer) return;
    clusterer.clearMarkers();
    clusterer.addMarkers(Object.values(markers));
  }, [clusterer, markers]);

  const setMarkerRef = useCallback((marker, key) => {
    setMarkers(markers => {
      if ((marker && markers[key]) || (!marker && !markers[key]))
        return markers;
      if (marker) {
        return { ...markers, [key]: marker };
      } else {
        const { [key]: _, ...newMarkers } = markers;
        return newMarkers;
      }
    });
  }, []);

  const handleInfoWindowClose = useCallback(() => {
    setSelectedTreeKey(null);
  }, []);

  const handleMarkerClick = useCallback((tree) => {
    setSelectedTreeKey(tree.key);
  }, []);

  return (
    <>
      {trees.map(tree => (
        <TreeMarker
          key={tree.key}
          tree={tree}
          onClick={handleMarkerClick}
          setMarkerRef={setMarkerRef}
        />
      ))}
      {selectedTreeKey && (
        <InfoWindow
          anchor={markers[selectedTreeKey]}
          onCloseClick={handleInfoWindowClose}>
          <div style={{ padding: '8px' }}>
            <strong>{selectedTree?.name}</strong>
          </div>
        </InfoWindow>
      )}
    </>
  );
};