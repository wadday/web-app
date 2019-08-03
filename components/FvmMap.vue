<template>
    <div class="w-full h-full">
        <div id="map" class="w-full h-full"></div>

        <info-window v-if="edit_info" :position="current_marker"></info-window>
    </div>
</template>

<script>
    import debounce from 'lodash.debounce';
    import InfoWindow from "./map/InfoWindow";
    let map;
    let purple_icon =  'http://maps.google.com/mapfiles/ms/icons/purple-dot.png' ;
    export default {
        name: 'FvmMap',
        components: {InfoWindow},
        props: {
            latitude: {
                type: Number,
                required: false,
                default: function() {
                    return -0.294591
                }
            },
            longitude: {
                type: Number,
                required: false,
                default: function() {
                    return 73.4198885
                }
            },
            zoom: {
                type: Number,
                required: false,
                default: function() {
                    return 15
                }
            },
            neighboursTriggerLevel: {
                type: Number,
                required: false,
                default: function() {
                    return 18
                }
            },
            getNeighbours: {
                type: Boolean,
                default: true
            },
            editing: {
                type: Boolean,
                required: false,
                default: false
            }
        },

        watch: {
            zoom: {
                handler(val) {
                    map.setZoom(val);
                    this.zoomLevel = val;

                    if (!this.editing && this.getNeighbours && this.zoomLevel >= this.neighboursTriggerLevel) {
                        this.fetch();
                    }
                }
            },
            center: {
                handler(val) {
                    if (!this.editing && this.getNeighbours && this.zoomLevel >= this.neighboursTriggerLevel) {
                        this.fetch();
                    }
                }
            },
            editing: {
                handler(val) {
                    if (!this.editing) {
                        this.edit_info = false;
                        this.current_marker.lat = null
                        this.current_marker.lng = null
                    }
                }
            }
        },

        data() {
            return {
                edit_info: false,
                current_marker: {
                    lat: null,
                    lng: null
                },
                markers: [],
                center: {
                    lat: this.latitude,
                    lng: this.longitude
                },
                zoomLevel: 15,
                options:  {
                    mapTypeId: 'terrain',
                    disableDefaultUI: true,
                    mapTypeControls: {
                        mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
                            'fvm_map']
                    }
                },
            }
        },

        methods: {
            setCenter(center) {
                let cnt = {
                    lat: center.lat(),
                    lng: center.lng()
                }
                this.$set(this, 'center', cnt);
            },
            setZoom(zoom) {
                this.$set(this, 'zoomLevel', zoom);
                this.$emit('zoomed', zoom)
            },

            fetchNeighbour() {
                this.$axios.$get(`/api/markers/neighbors?lat=${this.center.lat}&long=${this.center.lng}&zoom=${this.zoomLevel}`)
                    .then(result => {
                        this.clearNeighbour();
                        this.populateNeighbours(result);
                    })
                    .catch(() => {

                    })
            },
            populateNeighbours(neighbours) {
                this.markers = [];
                if (Array.isArray(neighbours.features) && neighbours.features.length) {
                    neighbours.features.forEach(neighbour => {
                        let marker = new google.maps.Marker({
                            position: {
                                lat: neighbour.geometry.coordinates[1],
                                lng: neighbour.geometry.coordinates[0]
                            },
                            title: neighbour.properties.name,
                            map: map
                        });
                        this.markers.push( marker );
                    })
                }
            },

            clearNeighbour() {
                for( let i = 0; i < this.markers.length; i++ ){
                    this.markers[i].setMap( null );
                }
            },
            getMarkerId(lat, lng) {
              return lat+'_'+lng;
            },
            addLocation(e) {
                let _this = this;
                let lat = e.latLng.lat();
                let lng = e.latLng.lng();
                let markerId = this.getMarkerId(lat, lng);
                this.current_marker.lat = lat;
                this.current_marker.lng = lng;
                let marker = new google.maps.Marker({
                    position: {
                        lat: lat,
                        lng: lng
                    },
                    map: map,
                    icon: purple_icon,
                    draggable:true,
                    animation: google.maps.Animation.DROP,
                    id: 'marker_'+markerId
                });
                marker.addListener('click', function() {
                    _this.infoWindow(marker);
                    _this.edit_info = true;
                });
                this.$emit('pin-dropped')
            },
            infoWindow(marker) {
                // let contentString = '<div id="content" class="p-2">'+
                //   '<div id="siteNotice">'+
                //   '</div>'+
                //   '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
                //   '<div id="bodyContent">'+
                //   '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
                //   'sandstone rock formation in the southern part of the '+
                //   'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
                //   'south west of the nearest large town, Alice Springs; 450&#160;km '+
                //   '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
                //   'features of the Uluru - Kata Tjuta National Park. Uluru is '+
                //   'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
                //   'Aboriginal people of the area. It has many springs, waterholes, '+
                //   'rock caves and ancient paintings. Uluru is listed as a World '+
                //   'Heritage Site.</p>'+
                //   '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
                //   'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
                //   '(last visited June 22, 2009).</p>'+
                //   '</div>'+
                //   '</div>';
                //
                // let infowindow = new google.maps.InfoWindow({
                //     content: contentString
                // });
                // infowindow.open(map, marker);
            },
            initMap() {
                /**
                 * @type {google.maps.Map}
                 */

                let mapStyle = [
                    {
                        "featureType": "poi",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                ];

                let styledMap = new google.maps.StyledMapType(mapStyle, {name: 'fvm_map'});

                map = new google.maps.Map(document.getElementById('map'), {
                    center: {
                        lat: this.latitude,
                        lng: this.longitude
                    },
                    zoom: this.zoom,
                    ...this.options
                });

                map.mapTypes.set('fvm_map', styledMap);
                map.setMapTypeId('fvm_map');

                let self = this;
                map.addListener('zoom_changed', function() {
                    self.zoomLevel = map.getZoom();
                    self.setZoom(map.getZoom());
                });
                map.addListener('center_changed', function() {
                   self.setCenter(map.getCenter());
                });

                google.maps.event.addListener(map, 'click', function(e) {
                    self.addLocation(e);
                });


                // infoWindow = new google.maps.InfoWindow;

                // let script = document.createElement('script');
                // This example uses a local copy of the GeoJSON stored at
                // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
                // script.src = '/data';
                // document.getElementsByTagName('head')[0].appendChild(script);
            },
        },

        created() {
            //wait for event to finish before sending request to server
            this.fetch = debounce(this.fetchNeighbour, 500)
        },

        mounted() {
            let scriptLoaded = document.getElementById('gMapsScript');

            if (scriptLoaded === null) {
                let apiKey = process.env.GOOGLE_MAPS_API_KEY;
                let googleMapScript = document.createElement('script');
                googleMapScript.src = `//maps.googleapis.com/maps/api/js?key=${apiKey}`;
                googleMapScript.id = 'gMapsScript';
                googleMapScript.onload = this.initMap;
                document.getElementsByTagName('head')[0].appendChild(googleMapScript);
            }

            this.clearNeighbour();

            if (!this.editing && this.getNeighbours && this.zoomLevel >= this.neighboursTriggerLevel) {
                this.fetch();
            }
        }
    }
</script>