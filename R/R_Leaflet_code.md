```Rscript
library(leaflet)
library(leaflet.minicharts)
library(shiny)
library(rgdal) #support for .shp file

#Read from .csv in working folder
Evac <- read.csv(file="Evac_R2.csv", header=TRUE, sep=",")

#Read from .shp file
bestTrack <- readOGR("shp/al112017_windswath.shp",
  layer = "al112017_windswath", GDAL1_integer64_policy = TRUE)

tilesURL <- "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"

title <- shiny::tags$div(HTML('<h3>Hurricane Irma Evacuation Survey</h3><br>Map shows evacuation response for the centroid<br>of the participant’s zip code. Wind field can be turned off.<br><a href="https://www.nhc.noaa.gov/archive/2017/IRMA_graphics.php?product=5day_cone_no_line_and_wind">Click here to see archived forecasted information.</a>')) # add shiny library to use "tags"

colors <- c("#4fc13c", "#db9b23")

pal <- colorFactor("YlOrRd", bestTrack$RADII)

m <- leaflet(data = bestTrack) %>%
  addPolygons(color = "#444444",
  weight = 1,
  smoothFactor = 0.5,
  opacity = 1.0,
  fillOpacity = 0.2,
  fillColor = ~colorQuantile("YlOrRd", RADII)(RADII),
  highlightOptions = highlightOptions(color = "white", weight = 2, bringToFront = FALSE),
  group="Wind Field") %>%
  addTiles(tilesURL) %>%
  addMinicharts(
    Evac$longitude, Evac$latitude,
    type = "pie",
    chartdata = Evac[, c("Evac", "NoEvac")],
    colorPalette = colors,
    width = 32 * sqrt(Evac$total) / sqrt(max(Evac$total)),
    transitionTime = 0,
    opacity = 1,
    showLabels = TRUE,
    labelText = NULL,
    labelMinSize = 6,
    labelMaxSize = 12,
    labelStyle = NULL,
    popup = popupArgs(
      labels = c("Evacuated", "Did not Evacuate"),
      html = paste0(
        "<div>",
        "<h3>",
        Evac$city,
        ", ",
        Evac$state,
        "<br>",
        "ZIP Code: ",
        Evac$ZIP_Code,
        "</h3>",
        "Evacuated: ",
        Evac$Evac,
        "<br>",
        "Did Not Evacuate: ",
        Evac$NoEvac,
        "<br>",
        "<b>",
        "Total: ",
        Evac$total,
        "</b>",
        "</div>"
       )
      ),
    layerId = NULL,
    legend = FALSE,
    legendPosition = "topright",
    timeFormat = NULL,
    initialTime = NULL,
    onChange = NULL
  ) %>%
  setView(-82.900, 28.300, zoom = 6) %>%
  addLegend(
    "topright",
    colors= colors,
    labels=c("Evacuated", "Did Not Evacuate"),
    title="Survey") %>%
  addLegend(group="Wind Field",
    "topright",
    colors= pal(c(34,50,64)),
    labels=c("34 to < 50 knots", "50 to < 64 knots", "64+ knots"),
    title="Wind Field") %>%
  addScaleBar(position = c("bottomright")) %>%
  addControl(title, position = "bottomleft") %>%
  addLayersControl(
          overlayGroups =c("Wind Field"),
          options = layersControlOptions(collapsed=FALSE)
          )
```
