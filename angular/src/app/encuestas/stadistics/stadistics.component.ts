import {Component, ElementRef, Inject, NgZone, OnInit, PLATFORM_ID, Renderer2, ViewChild} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import {EncuestasService} from "../../services/encuestas.service";
import {AuthService} from "../../usuarios/auth.service";
import {Encuesta} from "../../classes/encuesta";
import {ActivatedRoute, Router} from "@angular/router";
import {map} from "rxjs/operators";
import {RespuestasService} from "../../services/respuestas.services";
import {disable} from "@amcharts/amcharts4/.internal/core/utils/Debug";
import Swal from "sweetalert2";

@Component({
  selector: 'app-stadistics',
  templateUrl: './stadistics.component.html',
  styleUrls: ['./stadistics.component.css']
})
export class StadisticsComponent implements OnInit {

  public encuesta: Encuesta = new Encuesta();

  //PIE
  private chart: am4charts.PieChart;
  private chartVerif: am4charts.PieChart;

  @ViewChild('containerPreguntas', {static: true}) divView: ElementRef

  constructor(@Inject(PLATFORM_ID) private platformId,
              private zone: NgZone,
              private activatedRoute: ActivatedRoute,
              private encuestaService: EncuestasService,
              public authService: AuthService,
              private router: Router,
              private respuestaService: RespuestasService) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params ['id']
      if (id) {
        this.encuestaService.getEncuesta(id).subscribe((encuesta) => {
          if (encuesta.usuario.id == JSON.parse(sessionStorage.getItem('persona')).id) {
            this.encuesta = encuesta;
          }
          else {
            Swal.fire("Acceso denegado", "lo siento, no tienes acceso a este recurso", "warning")
            this.router.navigate(['/'])
          }
        })
      }
    })
  }

  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit() {
    // Chart code goes in here
    // this.browserOnly(() => {
    //   this.activatedRoute.params.subscribe(params => {
    //     let id = params ['id']
    //     if (id) {
    //         this.respuestaService.getRespuestasByEncuestaId(id).subscribe(respuestas => {
    //           // console.log("Respuestas: ", respuestas)
    //           // console.log("Encuesta: ", this.encuesta)
    //           // Empiezo a generar los charts por cada pregunta
    //           this.encuesta.preguntas.forEach(pregunta => {
    //
    //             //genero divs en document
    //             const div = document.createElement('div');
    //             div.setAttribute("id", "chart_" + pregunta.id);
    //
    //             const h1 = document.createElement('h1');
    //             h1.setAttribute("id", "h1_" + pregunta.id);
    //             h1.innerHTML = pregunta.descripcion;
    //             div.appendChild(h1)
    //
    //             console.log(h1)
    //             console.log(div)
    //             this.divView.nativeElement.appendChild(div);
    //
    //             switch (pregunta.tipo) {
    //               case 'Respuesta Simple':
    //                 this.respuestaService.getRespuestasByPreguntaId(pregunta.id).subscribe(respuestas => {
    //                   respuestas.forEach(respuesta => {
    //                     const span = document.createElement('li')
    //                     span.innerHTML = respuesta + "</br>"
    //                     div.appendChild(span);
    //                   })
    //                 })
    //                 break;
    //               case 'Parrafo':
    //                 this.respuestaService.getRespuestasByPreguntaId(pregunta.id).subscribe(respuestas => {
    //                   respuestas.forEach(respuesta => {
    //                     const span = document.createElement('li')
    //                     span.innerHTML = respuesta + "</br>"
    //                     div.appendChild(span);
    //                   })
    //                 })
    //                 break;
    //               case 'Opcion Multiple':
    //
    //                 let chart = am4core.create(div.getAttribute("id"), am4charts.PieChart);
    //                 // @ts-ignore
    //                 respuestas.respuestas.map(r => {
    //                   if (r.pregunta_id == pregunta.id) {
    //                     if (r.resp_count == null)
    //                       r.resp_count = 0;
    //                     chart.data.push({"pregunta": r.resp_text, "respuestas": r.resp_count})
    //                   }
    //                 })
    //                 chart.logo.disabled = true;
    //
    //                 let pieSeries = chart.series.push(new am4charts.PieSeries());
    //                 pieSeries.dataFields.value = "respuestas";
    //                 pieSeries.dataFields.category = "pregunta";
    //                 break;
    //               case 'Casillas de Verificacion':
    //                 let chartVerif = am4core.create(div.getAttribute("id"), am4charts.PieChart);
    //                 // @ts-ignore
    //                 respuestas.respuestas.map(r => {
    //                   if (r.pregunta_id == pregunta.id) {
    //                     if (r.resp_count == null)
    //                       r.resp_count = 0;
    //                     chartVerif.data.push({"pregunta": r.resp_text, "respuestas": r.resp_count})
    //                   }
    //                 })
    //
    //                 chartVerif.logo.disabled = true;
    //
    //                 let pieSeriesVerif = chartVerif.series.push(new am4charts.PieSeries());
    //                 pieSeriesVerif.dataFields.value = "respuestas";
    //                 pieSeriesVerif.dataFields.category = "pregunta";
    //                 break;
    //               case 'Escala Lineal':
    //                 let chartLineal = am4core.create(div.getAttribute("id"), am4charts.XYChart);
    //
    //                 // @ts-ignore
    //                 respuestas.respuestas.map(r => {
    //                   if (r.pregunta_id == pregunta.id) {
    //                     if (r.resp_count == null)
    //                       r.resp_count = 0;
    //                     chartLineal.data.push({"value": r.resp_text, "respuestas": r.resp_count})
    //                   }
    //                 })
    //                 console.log("linealData", chartLineal.data);
    //
    //                 let categoryAxis = chartLineal.xAxes.push(new am4charts.CategoryAxis());
    //                 categoryAxis.dataFields.category = "value";
    //                 categoryAxis.title.text = "respuestas";
    //
    //                 let valueAxis = chartLineal.yAxes.push(new am4charts.ValueAxis());
    //                 valueAxis.title.text = "rango";
    //
    //                 let series = chartLineal.series.push(new am4charts.ColumnSeries());
    //                 series.name = "Escala Lineal";
    //                 series.columns.template.tooltipText = `Series: {name}\nValor: {value}\nRespuestas: {respuestas}`;
    //                 series.columns.template.fill = am4core.color("#104547"); // fill
    //                 series.dataFields.valueY = "respuestas";
    //                 series.dataFields.categoryX = "value";
    //
    //                 chartLineal.logo.disabled = true;
    //                 break;
    //             }
    //           })
    //         })
    //     }
    //   })
    // });
    //backup
    this.browserOnly(() => {
      this.activatedRoute.params.subscribe(params => {
        let id = params ['id']
        if (id) {
          this.encuestaService.getEncuesta(id).subscribe((encuesta) => {
            this.respuestaService.getRespuestasByEncuestaId(id).subscribe(respuestas => {
              console.log("Respuestas: ", respuestas)
              console.log("Encuesta: ", encuesta)
              // Empiezo a generar los charts por cada pregunta
              this.encuesta.preguntas.forEach(pregunta => {

                //genero divs en document
                const div = document.createElement('div');
                div.setAttribute("id", "chart_" + pregunta.id);

                const h1 = document.createElement('h1');
                h1.setAttribute("style", "margin-top: 30px");
                h1.innerHTML = pregunta.descripcion;
                div.appendChild(h1)

                const divcontent = document.createElement('div');
                // h1.setAttribute("id", "h1_" + pregunta.id);
                divcontent.setAttribute("id", "chart_content_" + pregunta.id);

                div.appendChild(h1)
                div.appendChild(divcontent)

                console.log(h1)
                console.log(div)
                this.divView.nativeElement.appendChild(div);

                switch (pregunta.tipo) {
                  case 'Respuesta Simple':
                    this.respuestaService.getRespuestasByPreguntaId(pregunta.id).subscribe(respuestas => {
                      respuestas.forEach(respuesta => {
                        const span = document.createElement('li')
                        span.innerHTML = respuesta + "</br>"
                        div.appendChild(span);
                      })
                    })
                    break;
                  case 'Parrafo':
                    this.respuestaService.getRespuestasByPreguntaId(pregunta.id).subscribe(respuestas => {
                      respuestas.forEach(respuesta => {
                        const span = document.createElement('li')
                        span.innerHTML = respuesta + "</br>"
                        div.appendChild(span);
                      })
                    })
                    break;
                  case 'Opcion Multiple':
                    let chart = am4core.create(divcontent.getAttribute("id"), am4charts.PieChart);
                    // @ts-ignore
                    respuestas.respuestas.map(r => {
                      if (r.pregunta_id == pregunta.id) {
                        if (r.resp_count == null)
                          r.resp_count = 0;
                        chart.data.push({"pregunta": r.resp_text, "respuestas": r.resp_count})
                      }
                    })
                    chart.logo.disabled = true;

                    let pieSeries = chart.series.push(new am4charts.PieSeries());
                    pieSeries.dataFields.value = "respuestas";
                    pieSeries.dataFields.category = "pregunta";
                    break;
                  case 'Casillas de Verificacion':
                    let chartVerif = am4core.create(divcontent.getAttribute("id"), am4charts.PieChart);
                    // @ts-ignore
                    respuestas.respuestas.map(r => {
                      if (r.pregunta_id == pregunta.id) {
                        if (r.resp_count == null)
                          r.resp_count = 0;
                        chartVerif.data.push({"pregunta": r.resp_text, "respuestas": r.resp_count})
                      }
                    })

                    chartVerif.logo.disabled = true;

                    let pieSeriesVerif = chartVerif.series.push(new am4charts.PieSeries());
                    pieSeriesVerif.dataFields.value = "respuestas";
                    pieSeriesVerif.dataFields.category = "pregunta";
                    break;
                  case 'Escala Lineal':
                    let chartLineal = am4core.create(divcontent.getAttribute("id"), am4charts.XYChart);

                    // @ts-ignore
                    respuestas.respuestas.map(r => {
                      if (r.pregunta_id == pregunta.id) {
                        if (r.resp_count == null)
                          r.resp_count = 0;
                        chartLineal.data.push({"value": r.resp_text, "respuestas": r.resp_count})
                      }
                    })
                    console.log("linealData", chartLineal.data);

                    let categoryAxis = chartLineal.xAxes.push(new am4charts.CategoryAxis());
                    categoryAxis.dataFields.category = "value";
                    categoryAxis.title.text = "respuestas";

                    let valueAxis = chartLineal.yAxes.push(new am4charts.ValueAxis());
                    valueAxis.title.text = "rango";

                    let series = chartLineal.series.push(new am4charts.ColumnSeries());
                    series.name = "Escala Lineal";
                    series.columns.template.tooltipText = `Series: {name}\nValor: {value}\nRespuestas: {respuestas}`;
                    series.columns.template.fill = am4core.color("#104547"); // fill
                    series.dataFields.valueY = "respuestas";
                    series.dataFields.categoryX = "value";

                    chartLineal.logo.disabled = true;
                    break;
                }
              })
            })
          })
        }
      })
    });
  }

  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.chart) {
        this.chart.dispose();
      }
      if (this.chartVerif) {
        this.chartVerif.dispose();
      }
    });
  }


}
