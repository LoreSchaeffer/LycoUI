import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';
import {Col, Row} from "./index";

const DemoBox = ({children, height = 'auto'}: { children: React.ReactNode; height?: string }) => (
    <div style={{
        backgroundColor: 'var(--slate-800)',
        color: 'var(--color-text-primary)',
        padding: 'var(--spacing-4)',
        borderRadius: 'var(--radius-base)',
        border: '1px solid var(--color-border-base)',
        textAlign: 'center',
        height: height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-family-base)',
        fontSize: 'var(--font-size-sm)'
    }}>
        {children}
    </div>
);

const meta: Meta<typeof Row> = {
    title: 'Layout/Grid',
    component: Row,
    parameters: {layout: 'padded'},
    argTypes: {
        align: {
            control: 'select',
            options: ['stretch', 'start', 'center', 'end'],
            description: 'Vertical alignment of the columns within the row.',
        }
    }
};

export default meta;
type Story = StoryObj<typeof Row>;

export const AutoLayout: Story = {
    render: () => (
        <Row>
            <Col><DemoBox>Auto Col</DemoBox></Col>
            <Col><DemoBox>Auto Col</DemoBox></Col>
            <Col><DemoBox>Auto Col</DemoBox></Col>
        </Row>
    )
};

export const Responsive: Story = {
    render: () => (
        <div style={{display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)'}}>
            <Row>
                <Col span={12} md={6} lg={3}><DemoBox>col-12 md-6 lg-3</DemoBox></Col>
                <Col span={12} md={6} lg={3}><DemoBox>col-12 md-6 lg-3</DemoBox></Col>
                <Col span={12} md={6} lg={3}><DemoBox>col-12 md-6 lg-3</DemoBox></Col>
                <Col span={12} md={6} lg={3}><DemoBox>col-12 md-6 lg-3</DemoBox></Col>
            </Row>
            <Row>
                <Col span={12} lg={8}><DemoBox>col-12 lg-8</DemoBox></Col>
                <Col span={12} lg={4}><DemoBox>col-12 lg-4</DemoBox></Col>
            </Row>
        </div>
    )
};

export const Alignment: Story = {
    args: {
        align: 'stretch',
    },
    render: (args) => (
        <div style={{border: '1px dashed var(--slate-600)', padding: 'var(--spacing-4)', borderRadius: 'var(--radius-lg)'}}>
            <Row {...args}>
                <Col span={4}><DemoBox height="150px">Tall Content</DemoBox></Col>
                <Col span={4}><DemoBox>Short</DemoBox></Col>
                <Col span={4}><DemoBox height="80px">Medium</DemoBox></Col>
            </Row>
        </div>
    )
};