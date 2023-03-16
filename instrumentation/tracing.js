import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { ConsoleSpanExporter, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { ExpressInstrumentation } from "@opentelemetry/instrumentation-express";
import { MongoDBInstrumentation } from "@opentelemetry/instrumentation-mongodb";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import { MongooseInstrumentation } from "@opentelemetry/instrumentation-mongoose";
import { JaegerExporter } from "@opentelemetry/exporter-jaeger";

const provider = new NodeTracerProvider({
    resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: 'basic-service',
    }),
});

const exporter2 = new JaegerExporter({
    endpoint: "http://localhost:14268/api/traces",
});

provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
provider.addSpanProcessor(new SimpleSpanProcessor(exporter2));

provider.register();

registerInstrumentations({
    instrumentations: [
        new MongoDBInstrumentation(),
        new MongooseInstrumentation(),
        new HttpInstrumentation(),
        new ExpressInstrumentation()
    ],
    tracerProvider: provider,
});

// registerInstrumentations({
//     instrumentations: [
//         getNodeAutoInstrumentations({
//             // load custom configuration for http instrumentation
//             '@opentelemetry/instrumentation-http': {
//                 applyCustomAttributesOnSpan: (span) => {
//                     span.setAttribute('foo2', 'bar2');
//                 },
//             },
//         }),
//     ],
// });