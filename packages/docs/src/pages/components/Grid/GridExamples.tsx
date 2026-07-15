import {Col, Row} from 'lyco-ui';
import type {CSSProperties} from "react";

const contentStyle: CSSProperties = {
    padding: 'var(--spacing-4)',
    backgroundColor: 'var(--color-bg-surface)',
    border: '1px solid var(--color-border-base)',
    borderRadius: 'var(--radius-md)',
    textAlign: 'center' as const,
    color: 'var(--color-text-primary)'
};

export const gridExamples = {
    autoLayout: {
        reactCode: `
<Row>
    <Col>
        <div>Col 1</div>
    </Col>
    <Col>
        <div>Col 2</div>
    </Col>
    <Col>
        <div>Col 3</div>
    </Col>
</Row>`.trim(),
        htmlCode: `
<div class="lyco-row">
    <div class="lyco-col">
        <div>Col 1</div>
    </div>
    <div class="lyco-col">
        <div>Col 2</div>
    </div>
    <div class="lyco-col">
            <div>Col 3</div>
    </div>
</div>`.trim(),
        preview: (
            <Row>
                <Col>
                    <div style={contentStyle}>Col 1</div>
                </Col>
                <Col>
                    <div style={contentStyle}>Col 2</div>
                </Col>
                <Col>
                    <div style={contentStyle}>Col 3</div>
                </Col>
            </Row>
        )
    },

    settingOneColumnWidth: {
        reactCode: `
<Row>
    <Col>
        <div>1 of 3</div>
    </Col>
    <Col span={6}>
        <div>2 of 3 (wider)</div>
    </Col>
    <Col>
        <div>3 of 3</div>
    </Col>
</Row>`.trim(),
        htmlCode: `
<div class="lyco-row">
    <div class="lyco-col">1 of 3</div>
    <div class="lyco-col-6">2 of 3 (wider)</div>
    <div class="lyco-col">3 of 3</div>
</div>`.trim(),
        preview: (
            <Row>
                <Col>
                    <div style={contentStyle}>1 of 3</div>
                </Col>
                <Col span={6}>
                    <div style={contentStyle}>2 of 3 (wider)</div>
                </Col>
                <Col>
                    <div style={contentStyle}>3 of 3</div>
                </Col>
            </Row>
        )
    },

    responsiveSizing: {
        reactCode: `
<Row className="lyco-mb-4">
    <Col span={12} md={8}>
        <div>span=12 md=8</div>
    </Col>
    <Col span={12} md={4}>
        <div>span=12 md=4</div>
    </Col>
</Row>`.trim(),
        htmlCode: `
<div class="lyco-row lyco-mb-4">
    <div class="lyco-col-12 lyco-col-md-8">span=12 md=8</div>
    <div class="lyco-col-12 lyco-col-md-4">span=12 md=4</div>
</div>`.trim(),
        preview: (
            <Row className="lyco-mb-4">
                <Col span={12} md={8}>
                    <div style={contentStyle}>span=12 md=8</div>
                </Col>
                <Col span={12} md={4}>
                    <div style={contentStyle}>span=12 md=4</div>
                </Col>
            </Row>
        )
    },

    alignment: {
        reactCode: `
<Row align="center">
    <Col span={4}>
        <div>Tall</div>
    </Col>
    <Col span={2}>
        <div>Inherited</div>
    </Col>
    <Col span={2} align="start">
        <div>Start aligned</div>
    </Col>
    <Col span={2} align="center">
        <div>Center aligned</div>
    </Col>
    <Col span={2} align="end">
        <div>End aligned</div>
    </Col>
</Row>`.trim(),
        htmlCode: `
<div class="lyco-row lyco-row--align-center">
    <div class="lyco-col-4">
        <div>Tall</div>
    </div>
    <div class="lyco-col-2">
        <div>Inherited</div>
    </div>
    <div class="lyco-col-2 lyco-col--align-start">
        <div>Start aligned</div>
    </div>
    <div class="lyco-col-2 lyco-col--align-center">
        <div>Center aligned</div>
    </div>
    <div class="lyco-col-2 lyco-col--align-end">
        <div>End aligned</div>
    </div>
</div>`.trim(),
        preview: (
            <Row align="center">
                <Col span={4}>
                    <div style={{...contentStyle, height: '80px'}}>Tall</div>
                </Col>
                <Col span={2}>
                    <div style={contentStyle}>Inherited</div>
                </Col>
                <Col span={2} align="start">
                    <div style={contentStyle}>Start aligned</div>
                </Col>
                <Col span={2} align="center">
                    <div style={contentStyle}>Center aligned</div>
                </Col>
                <Col span={2} align="end">
                    <div style={contentStyle}>End aligned</div>
                </Col>
            </Row>
        )
    },

    stretching: {
        reactCode: `
<Row>
    <Col span={6}>
        <div style={{ height: '150px'}}>Fixed height</div>
    </Col>
    <Col span={6} stretch>
        <div>
            I automatically stretch to fill the 150px height dictacted by my sibling.
        </div>
    </Col>
</Row>`.trim(),
        htmlCode: `
<div class="lyco-row">
    <div class="lyco-col-6" style="height: 150px;">...</div>
    <div class="lyco-col-6 lyco-col--stretch">
        <div>
            I automatically stretch to fill the 150px height dictacted by my sibling.
        </div>
    </div>
</div>`.trim(),
        preview: (
            <Row>
                <Col span={6}>
                    <div style={{...contentStyle, height: '150px'}}>Fixed height content</div>
                </Col>
                <Col span={6} stretch>
                    <div style={{
                        ...contentStyle,
                        display: 'flex',
                        justifyContent: 'center',
                        backgroundColor: 'var(--color-primary-dim)',
                        borderColor: 'var(--color-primary)'
                    }}>
                        I automatically stretch to fill the 150px height dictacted by my sibling.
                    </div>
                </Col>
            </Row>
        )
    }
};